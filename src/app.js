const { NODE_ENV, PORT, ORIGIN, CREDENTIALS, LOG_FORMAT } = require('./config');
const { createServer } = require('http');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const { logger, stream } = require('./utils/logger');
const { ErrorMiddleware } = require('./middlewares/error.middleware');
const path = require('path');
const fs = require('fs');

class App {
  app;
  env;
  port;
  http;

  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3123;
    this.http = createServer(this.app);

    this._initializeMiddlewares();
    this._initializeRoutes(routes);
    this._initializeErrorHandling();
    this._initializeUploadsFolder();
  }

  listen() {
    this.http.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🔥 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  getServer() {
    return this.app;
  }

  _initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      })
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  _initializeRoutes(routes) {
    this.app.get('/', (req, res) => {
      res.json({ message: 'le wqt est un animal aquatique nocturne' });
    });

    const uploadsPath = path.join(__dirname, '..', '/public/images');
    console.log(uploadsPath);

    this.app.get('/images/:directory/:filename', (req, res) => {
      const filePath = path.join(uploadsPath, req.params.directory, req.params.filename);

      // Vérifier si le fichier existe
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.status(404).json({
            message: 'File not found!',
          });
        } else {
          res.sendFile(filePath);
        }
      });
    });

    routes.forEach((route) => {
      this.app.use('/api', route.router);
    });
  }

  _initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  _initializeUploadsFolder() {
    this.app.use(express.static('/public/images'));
  }
}

module.exports = App;
