const express = require('express');
const bodyParser = require('body-parser');

class App {
  app;

  constructor(routes) {
    this.app = express();
  }
}

// const app = {};

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.json({ message: 'Lorenzo' });
// });

// app.use((req, res) => {
//   res.status(404).json({
//     status: 'NOT FOUND',
//     code: 404,
//     message: `Cannot GET ${req.url}`,
//   });
// });

module.exports = { App };
