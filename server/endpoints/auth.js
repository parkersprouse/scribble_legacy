// eslint-disable-next-line
'use strict';

const bcrypt = require('bcrypt-nodejs');
const config = require('../config');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');
const User = require('../models/user');

module.exports = {

  login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password)
      respond(res, constants.http_bad_request, 'Please make sure all required fields are filled out');
    else
      User.findOne({ where: { email: { $iLike: email } } })
        .then((data) => {
          if (!data)
            respond(res, constants.http_bad_request, 'Your e-mail or password was incorrect');
          else {
            const match = bcrypt.compareSync(password, data.pw_hash);
            if (match) {
              const payload = utils.generateJwtPayload(data);
              const token = jwt.sign(payload, config.jwt_secret);
              res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, secure: false });
              respond(res, constants.http_ok, null, token);
            }
            else
              respond(res, constants.http_bad_request, 'Your e-mail or password was incorrect');
          }
        })
        .catch((err) => {
          respond(res, constants.http_server_error, 'There was an unknown problem when trying to log you in');
        });
  },

  register(req, res, next) {
    respond(res, constants.http_ok, 'Alls well that ends well');
  }

};

// Private

function respond(res, status, message, content) {
  res.status(status).json({ message, content });
}
