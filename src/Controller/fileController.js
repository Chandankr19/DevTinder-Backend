const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }
  res.status(200).json({
    message: "File uploaded successfully!",
    file: req.file,
  });
};

const uploadFiles = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      message: "No files uploaded!",
    });
  }

  res.status(200).json({
    message: "Files uploaded successfully!",
    files: req.files,
  });
};

module.exports = {
  uploadFile,
  uploadFiles,
};
