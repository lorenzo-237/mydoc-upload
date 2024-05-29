const UploadService = require('./uploads.service');

class UploadController {
  uploadService = new UploadService();

  uploadTest = async (req, res, next) => {
    res.status(201).json({ message: 'Upload available' });
  };

  uploadFile = async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const result = await this.uploadService.uploadFile(file);
      res.status(201).json({ message: 'File uploaded successfully', data: result });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UploadController;
