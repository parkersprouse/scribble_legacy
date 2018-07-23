// eslint-disable-next-line
'use strict';

const jwt = require('jsonwebtoken');
const validator = require('validator');

const config = require('../config');
const constants = require('../config/constants');
const Users = require('../models/users');

const { db_err_duplicate, http_ok, http_no_content, http_bad_request, http_server_error } = constants;

function respond(res, status, message, content) {
  res.status(status).json({ message, content });
}

module.exports = {

  getAll(req, res, next) {
    Users.findAll()
      .then((data) => {
        const users = data.map((user) => user.get({ plain: true }));
        respond(res, http_ok, null, users);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get all users', err.message);
      });
  },

  getID(req, res, next) {
    Users.findOne({ where: { id: req.params.id } })
      .then((data) => {
        if (!data)
          respond(res, http_no_content, 'No user found');
        else
          respond(res, http_ok, null, data);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get users', err.message);
      });
  },

  getEmail(req, res, next) {
    Users.findOne({ where: { email: { $iLike: req.params.email } } })
      .then((data) => {
        if (!data)
          respond(res, http_no_content, 'No user found');
        else
          respond(res, http_ok, null, data);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get users', err.message);
      });
  },

  getName(req, res, next) {
    Users.findAll({ where: { name: { $iLike: `%${req.params.name}%` } } })
      .then((data) => {
        if (!data || data.length === 0)
          respond(res, http_no_content, 'No users found');
        else {
          const users = data.map((user) => user.get({ plain: true }));
          respond(res, http_ok, null, users);
        }
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get users', err.message);
      });
  },

  // data[0] is the number of rows affected
  // data[1] is the array containing the returned rows
  // data[1][0] is the first game that was returned
  // data[1][0].dataValues is the object containing the values of the returned row
  update(req, res, next) {
    Users.update(req.body, { where: { id: req.body.id }, returning: true })
      .then((data) => {
        if (!data[0])
          respond(res, http_bad_request, 'No user updated, check provided ID');
        else
          respond(res, http_ok, null, data[1][0].dataValues);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to update user', err.message);
      });
  },

  delete(req, res, next) {
    Users.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data < 1)
          respond(res, http_bad_request, 'No user deleted, check provided ID');
        else
          respond(res, http_ok);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to delete user', err.message);
      });
  },

  decodeToken(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, config.jwt_secret);

      Users.findOne({ where: { email: { $iLike: decoded.email } } })
        .then((data) => {
          respond(res, http_ok, null, decoded);
        })
        .catch((err) => {
          respond(res, http_bad_request);
        });
    }
    catch(e) {
      respond(res, http_bad_request);
    }
  }

};
