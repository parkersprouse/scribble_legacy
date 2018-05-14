// eslint-disable-next-line
'use strict';

const app = require('./app');
const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
