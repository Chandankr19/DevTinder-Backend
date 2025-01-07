const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  UPLOAD_DIR,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} = require("../config/constants");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      // Reject the file
      new Error("Invalid file type: Only JPEG, PNG, and GIF are allowed"),
      false
    );
  }
};

// upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = {
  singleUpload: upload.single("file"),
  multipleUpload: upload.array("files", 5),
}; 
