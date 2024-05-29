const { Router } = require('express');
const UploadController = require('./uploads.controller');
const { upload } = require('./upload.multer');

class UploadRoute {
  path = '/uploads';
  router = Router();
  uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.uploadController.uploadTest);
    this.router.post(`${this.path}`, upload.single('file'), this.uploadController.uploadFile);
  }
}

module.exports = UploadRoute;
