const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    const directory = path.join('public', 'images', dateString);
    // Créer le répertoire s'il n'existe pas
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    callback(null, directory);
  },
  filename: function (req, file, callback) {
    callback(null, timestampToTimeString(Date.now()) + '_' + file.originalname);
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

function timestampToTimeString(timestamp) {
  const date = new Date(timestamp);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}${minutes}${seconds}`;
}
