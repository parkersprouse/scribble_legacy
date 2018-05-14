// eslint-disable-next-line
'use strict';

const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');
//const User = require('../models/user');

module.exports = {

  login: function(req, res, next) {
    res.status(constants.http_ok)
      .json({
        status: 'success',
        content: 'Alls well that ends well',
        message: 'Alls well that ends well'
      });
  },

  register: function(req, res, next) {
    res.status(constants.http_ok)
      .json({
        status: 'success',
        content: 'Alls well that ends well',
        message: 'Alls well that ends well'
      });
  }

};
