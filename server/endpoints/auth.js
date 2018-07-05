// eslint-disable-next-line
'use strict';

const bcrypt = require('bcrypt');
const config = require('../config');
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const utils = require('../utils.js');
const validator = require('validator');
const User = require('../models/user');

const { db_err_duplicate, http_ok, http_bad_request, http_server_error } = constants;

function respond(res, status, message, content) {
  res.status(status).json({ message, content });
}

function tokenValid(decoded, data) {
  return (decoded.pw_hash === data.pw_hash) &&
         (decoded.email === data.email) &&
         (decoded.name === data.name)
}

module.exports = {

  login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password)
      respond(res, http_bad_request, 'Please make sure all required fields are filled out');
    else
      User.findOne({ where: { email: { $iLike: email } } })
        .then((data) => {
          if (!data)
            respond(res, http_bad_request, 'Your e-mail or password was incorrect');
          else {
            const match = bcrypt.compareSync(password, data.pw_hash);
            if (match) {
              const payload = utils.generateJwtPayload(data);
              const token = jwt.sign(payload, config.jwt_secret);
              respond(res, http_ok, null, token);
            }
            else
              respond(res, http_bad_request, 'Your e-mail or password was incorrect');
          }
        })
        .catch((err) => {
          respond(res, http_server_error, 'There was an unknown problem when trying to log you in');
        });
  },

  register(req, res, next) {
    const { confirm_password, email, name, password } = req.body;

    if (!email || !password || !confirm_password)
      respond(res, http_bad_request, 'Please make sure all required fields are filled out');
    else if (!validator.isEmail(email))
      respond(res, http_bad_request, 'Please make sure your e-mail is valid');
    else if (password !== confirm_password)
      respond(res, http_bad_request, 'Please make sure the passwords match');
    else {
      const salt = bcrypt.genSaltSync();
      const pw_hash = bcrypt.hashSync(password, salt);

      User.create({ name, email, pw_hash })
        .then((data) => {
          const payload = utils.generateJwtPayload(data);
          const token = jwt.sign(payload, config.jwt_secret);
          respond(res, http_ok, null, { data, token });
        })
        .catch((err) => {
          console.log(err)
          let message = 'There was an unknown problem when creating your account';
          if (err.name === db_err_duplicate)
            message = 'An account with that e-mail address already exists';
          respond(res, http_bad_request, message);
        });
    }
  },

  verifyToken(req, res, next) {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, config.jwt_secret);
      User.findOne({ where: { id: decoded.id } })
        .then((data) => {
          if (!data)
            respond(res, http_bad_request);
          else {
            if (tokenValid(decoded, data))
              respond(res, http_ok);
            else
              respond(res, http_bad_request);
          }
        })
        .catch((err) => {
          respond(res, http_bad_request);
        });
    }
    catch(err) {
      respond(res, http_bad_request);
    }
  }

};
