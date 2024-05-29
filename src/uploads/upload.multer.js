const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function (req, file, callback) {
    callback(null, timestampToDateTimeString(Date.now()) + '-' + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  // Rejecter un fichier s'il n'a pas l'extension appropriée
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type, only JPEG and PNG are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    // Limiter la taille des fichiers à 10 Mo
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

module.exports = { upload };

function timestampToDateTimeString(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}`;
}
