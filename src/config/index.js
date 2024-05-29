const dotenv = require('dotenv');
dotenv.config();

exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.APP_PORT;
exports.ORIGIN = process.env.ORIGIN;
exports.CREDENTIALS = process.env.CREDENTIALS === 'true' ? true : false;
exports.LOG_FORMAT = process.env.LOG_FORMAT;
exports.LOG_DIR = process.env.LOG_DIR;
