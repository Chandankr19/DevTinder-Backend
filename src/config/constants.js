const path = require("path");

module.exports = {
  UPLOAD_DIR: path.join(__dirname, "../uploads"),
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/png", "image/gif"],
  MAX_FILE_SIZE: 5 * 1024 * 1024,
};
