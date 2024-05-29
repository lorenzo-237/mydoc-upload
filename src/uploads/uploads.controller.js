class UploadController {
  uploadTest = async (req, res, next) => {
    res.status(201).json({ message: 'Upload available' });
  };

  uploadFile = async (req, res, next) => {
    try {
      res.status(200).json({
        message: 'File uploaded successfully!',
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

module.exports = UploadController;
