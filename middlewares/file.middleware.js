const path = require('path');
const multer = require('multer');
const { Readable } = require("stream");
const sharp = require("sharp");
const fs = require("fs");

// Importaremos las librerías necesarias para la nueva función
const cloudinary = require('cloudinary').v2;

// debugger
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    cb(new Error('Invalid file type'));
  } else {
    cb(null, true);
  }
}

const upload = multer({
  storage,
  fileFilter,
});


// Ahora tenemos un nuevo middleware de subida de archivos
const uploadToCloudinary = async (req, res, next) => {
  if (req.file) {
    try{
      const filePath = req.file.path;
      const image = await cloudinary.uploader.upload(filePath);

      // Borramos el archivo local
      await fs.unlinkSync(filePath);

      // Añadimos la propiedad file_url a nuestro Request
      req.file_url = image.secure_url;
      return next();
    }catch(error){
      return next(error)
    }
  } else {
    return next();
  }
};

module.exports = { upload: upload, uploadToCloudinary };
