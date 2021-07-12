const http = require('http');
require('./src/database');
//require('./src/templates');
const app = require('./src/app');

const port = 3000;

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
