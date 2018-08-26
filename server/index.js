/** @module index */
'use strict';

require('dotenv').config();
const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 9000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
