const App = require('./app');
const UploadRoute = require('./uploads/uploads.route');

const app = new App([new UploadRoute()]);

app.listen();
