// eslint-disable-next-line
'use strict';

require('dotenv').config();

const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
