/** @module app */
'use strict';

const body_parser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const raven = require('raven');

const endpoints = require('./endpoints');

const app = express();

raven.config('https://71cf03adb6e846b1adc1c7a60e95fb2b@sentry.io/1270511').install();
app.use(raven.requestHandler());
app.use(raven.errorHandler());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Allow CORS
app.use(cors());
app.options('*', cors()); // Pre-flight

// Parse application/json
app.use(body_parser.json());

// Parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// Make the app use helmet to protect it from a number of vulnerabilities
app.use(helmet());

// Setup our endpoints under the /api route
app.use('/api', endpoints);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

// Always return the main index.html, so vue-router renders the active route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Database setup - hard wipe and recreation
//require('./config/setup_db')();

module.exports = app;
