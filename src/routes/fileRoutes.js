const express = require("express");
const fileRouter = express.Router();
const { singleUpload, multipleUpload } = require("../middlewares/fileUpload");
const { uploadFile, uploadFiles } = require("../Controller/fileController");

// Route for single file upload
fileRouter.post("/upload", singleUpload, uploadFile);

// Route for multiple file upload
fileRouter.post("/uploads", multipleUpload, uploadFiles);

module.exports = fileRouter;
