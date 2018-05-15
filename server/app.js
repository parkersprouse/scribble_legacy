// eslint-disable-next-line
'use strict';

const body_parser = require('body-parser');
const endpoints = require('./endpoints');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// parse application/json
app.use(body_parser.json());

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// make the app use helmet to protect it from a number of vulnerabilities
app.use(helmet());

// Setup our endpoints under the /api route
app.use('/api', endpoints);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

// Always return the main index.html, so vue-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Database setup - hard wipe and recreation
//require('./config/setup_db')();

module.exports = app;
