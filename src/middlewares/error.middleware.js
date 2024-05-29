// const { Request, Response, NextFunction } = require('express');
// const { HttpException } = require('@exceptions/httpException');
const { logger } = require('../utils/logger');

exports.ErrorMiddleware = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
