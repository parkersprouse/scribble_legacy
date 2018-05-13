// eslint-disable-next-line
'use strict';

const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
