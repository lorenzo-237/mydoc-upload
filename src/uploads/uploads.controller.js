class UploadController {
  uploadTest = async (req, res, next) => {
    res.status(201).json({ message: 'Upload available' });
  };

  uploadFile = async (req, res, next) => {
    try {
      const imagePath = replaceBackslashesWithSlashes(req.file.path).replace('public', '');

      // const hostname = req.headers.host;
      // const protocol = req.protocol;

      const location = `${imagePath}`;

      res.status(200).json({
        message: 'File uploaded successfully!',
        location: location,
        file: {
          path: req.file.path,
          type: req.file.mimetype,
          size: req.file.size,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

function replaceBackslashesWithSlashes(str) {
  return str.replace(/\\/g, '/');
}

module.exports = UploadController;
