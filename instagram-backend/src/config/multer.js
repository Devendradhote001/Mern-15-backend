const multer = require("multer");

const storage = multer.memoryStorage();

let upload = multer({ storage });

module.exports = upload;
