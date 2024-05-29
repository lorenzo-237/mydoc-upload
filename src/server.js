const dotenv = require('dotenv');

dotenv.config();

const { app } = require('./app');

const port = process.env.APP_PORT || 3008;

app.listen(port, async () => {
  console.log(`\x1b[33m\x1b[4mApp Start\x1b[0m \x1b[33m=>\x1b[0m \x1b[34mPORT : ${port}\x1b[0m`);
});
