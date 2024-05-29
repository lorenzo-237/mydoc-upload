const { Router } = require('express');
const UploadController = require('./uploads.controller');

class UploadRoute {
  path = '/uploads';
  router = Router();
  uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.uploadController.uploadTest);
  }
}

module.exports = UploadRoute;
