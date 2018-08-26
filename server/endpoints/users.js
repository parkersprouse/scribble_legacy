/** @module endpoints/users */
'use strict';

const jwt = require('jsonwebtoken');
const validator = require('validator');

const config = require('../config');
const {
  db_err_duplicate,
  http_ok,
  http_no_content,
  http_bad_request,
  http_server_error
} = require('../config/constants');
const Users = require('../models/users');
const {
  call,
  respond
} = require('../utils');

module.exports = {

  /**
   * Gets all of the users.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getAll(req, res, next) {
    const [err, data] = await call(Users.findAll());
    if (err)
      return respond(res, http_server_error, 'Failed to get all users');

    const users = data.map((user) => user.get({ plain: true }));
    respond(res, http_ok, null, users);
  },

  /**
   * Finds a user by ID.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getID(req, res, next) {
    const { id } = req.params;

    const [err, data] = await call(Users.findOne({ where: { id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to get user');
    if (!data)
      return respond(res, http_no_content, 'No user found');

    respond(res, http_ok, null, data);
  },

  /**
   * Finds a user by email address.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getEmail(req, res, next) {
    const { email } = req.params;

    const [err, data] = await call(Users.findOne({
      where: { email: { $iLike: email } }
    }));
    if (err)
      return respond(res, http_server_error, 'Failed to get user');
    if (!data)
      return respond(res, http_no_content, 'No user found');

    respond(res, http_ok, null, data);
  },

  /**
   * Finds all users with a given name.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getName(req, res, next) {
    const { name } = req.params;

    const [err, data] = await call(Users.findAll({
      where: { name: { $iLike: `%${name}%` } }
    }));
    if (err)
      return respond(res, http_server_error, 'Failed to get users');
    if (!data || data.length === 0)
      return respond(res, http_no_content, 'No users found');

    const users = data.map((user) => user.get({ plain: true }));
    respond(res, http_ok, null, users);
  },

  /**
   * Updates a user.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async update(req, res, next) {
    // data[0] is the number of rows affected
    // data[1] is the array containing the returned rows
    // data[1][0] is the first game that was returned
    // data[1][0].dataValues is the object containing the values of the returned row
    const { id, email } = req.body;
    if (!email || !validator.isEmail(email))
      return respond(res, http_bad_request, 'Your e-mail must be valid');

    const [err, data] = await call(Users.update(req.body, { where: { id }, returning: true }));
    if (err)
      return respond(res, http_server_error, 'Failed to update user');
    if (!data[0])
      return respond(res, http_bad_request, 'No user updated, check provided ID');

    respond(res, http_ok, null, data[1][0].dataValues);
  },

  /**
   * Deletes a user.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async delete(req, res, next) {
    const { id } = req.body;

    const [err, data] = await call(Users.destroy({ where: { id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to delete user');
    if (data < 1)
      return respond(res, http_bad_request, 'No user deleted, check provided ID');

    respond(res, http_ok);
  },

  /**
   * Decodes a user's authentication JWT to get the contained information.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async decodeToken(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, config.jwt_secret);
      const { email } = decoded;

      const [err] = await call(Users.findOne({
        where: { email: { $iLike: email } }
      }));
      if (err)
        return respond(res, http_bad_request);

      respond(res, http_ok, null, decoded);
    }
    catch(e) {
      respond(res, http_bad_request);
    }
  }

};
