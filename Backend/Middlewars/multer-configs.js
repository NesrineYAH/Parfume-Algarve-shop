const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0]; // évite de doubler l'extension
    const extension = MIME_TYPES[file.mimetype];
    if (!extension) {
      return callback(new Error("Extension de fichier non reconnue"), null);
    }
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error("Type de fichier non autorisé"), false);
  }
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
