/** @module index */
'use strict';

require('dotenv').config();
require('raven').config('https://71cf03adb6e846b1adc1c7a60e95fb2b@sentry.io/1270511').install();
const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 9000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
