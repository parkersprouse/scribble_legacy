/** @module index */
'use strict';

require('dotenv').config();
require('raven').config(process.env.RAVEN_URL).install();
const http = require('http');

const app = require('./app');

const port = process.env.PORT || 9000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
