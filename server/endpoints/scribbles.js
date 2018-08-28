/** @module endpoints/scribbles */
'use strict';

const moment = require('moment');

const Scribbles = require('../models/scribbles');
const { Sequelize } = require('../config/db');
const { Op } = Sequelize;
const {
  db_err_duplicate,
  http_ok,
  http_no_content,
  http_bad_request,
  http_server_error
} = require('../config/constants');
const {
  call,
  respond
} = require('../utils');

module.exports = {

  /**
   * Gets all of the scribbles.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getAll(req, res) {
    const [err, data] = await call(Scribbles.findAll());
    if (err)
      return respond(res, http_server_error, 'Failed to get all scribbles', err.message);
    if (!data || data.length === 0)
      return respond(res, http_bad_request, 'No scribbles found');

    const scribbles = data.map((scribble) => scribble.get({ plain: true }));
    respond(res, http_ok, null, scribbles);
  },

  /**
   * Gets a paginated context of a user's scribbles.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async paginate(req, res) {
    let { page, per, owner_id } = req.body;
    if (!page) page = 1;
    if (!per) per = 12;

    const [all_err, all_data] = await call(Scribbles.findAll({ where: { owner_id } }));
    const [pagi_err, pagi_data] = await call(Scribbles.findAll({
      where: { owner_id }, limit: per, offset: (page - 1) * per, order: ['created_at']
    }));
    if (all_err || pagi_err)
      return respond(res, http_server_error, 'Failed to get scribbles');

    const total = all_data.length;
    const scribbles = pagi_data.map((scribble) => scribble.get({ plain: true }));
    respond(res, http_ok, null, { scribbles, total });
  },

  /**
   * Finds a scribble by ID.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getID(req, res) {
    const { id } = req.params;
    const [err, data] = await call(Scribbles.findOne({ where: { id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to get scribbles');
    if (!data)
      return respond(res, http_no_content, 'No scribble found');

    respond(res, http_ok, null, data);
  },

  /**
   * Finds all scribbles owned by the user with the given owner ID.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async getOwnerID(req, res) {
    const { owner_id } = req.params;
    const [err, data] = await call(Scribbles.findAll({ where: { owner_id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to get scribbles');
    if (!data || data.length === 0)
      return respond(res, http_no_content, 'No scribbles found');

    const scribbles = data.map((scribble) => scribble.get({ plain: true }));
    respond(res, http_ok, null, scribbles);
  },

  /**
   * Creates a new scribble.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async add(req, res) {
    let { body, title, owner_id } = req.body;
    if (!body)
      return respond(res, http_bad_request, 'Your scribble cannot be empty');
    if (!title)
      title = moment().format('MM/DD/YYYY h:mma');

    const [err, data] = await call(Scribbles.create({ body, title, owner_id }));
    if (err)
      return respond(res, http_server_error, 'Failed to create scribble');

    respond(res, http_ok, null, data);
  },

  /**
   * Updates a scribble.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async update(req, res) {
    // data[0] is the number of rows affected
    // data[1] is the array containing the returned rows
    // data[1][0] is the first game that was returned
    // data[1][0].dataValues is the object containing the values of the returned row
    const { body, id } = req.body;
    if (!body)
      return respond(res, http_bad_request, 'Your scribble cannot be empty');

    const [err, data] = await call(Scribbles.update(req.body, { where: { id }, returning: true }));
    if (err)
      return respond(res, http_server_error, 'Failed to update scribble');
    if (!data[0])
      return respond(res, http_bad_request, 'No scribble updated, check provided ID');

    respond(res, http_ok, null, data[1][0].dataValues);
  },

  /**
   * Deletes a scribble.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async delete(req, res) {
    const { id } = req.params;
    const [err, data] = await call(Scribbles.destroy({ where: { id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to delete scribble');
    if (data < 1)
      return respond(res, http_bad_request, 'No scribble deleted, check provided ID');

    respond(res, http_ok);
  },

  /**
   * Gets a paginated context of a user's scribbles that contain the provided
   * search term.
   * @function
   * @async
   * @param {object} req - The client's request.
   * @param {object} res - The server's response.
   * @returns {void}
   */
  async search(req, res) {
    let { page, per, term, owner_id } = req.body;
    if (!page) page = 1;
    if (!per) per = 12;
    if (!term || !owner_id)
      return respond(res, http_bad_request, 'Please provide a search term');

    const body = { body: { $iLike: `%${term}%` } };
    const title = { title: { $iLike: `%${term}%` } };
    const query = { [Op.or]: [body, title], owner_id };
    const [all_err, all_data] = await call(Scribbles.findAll({ where: query }));
    const [pagi_err, pagi_data] = await call(Scribbles.findAll({
      where: query, limit: per, offset: (page - 1) * per, order: ['created_at']
    }));
    if (all_err || pagi_err)
      return respond(res, http_server_error, 'Failed to get scribbles');
    if (!pagi_data || pagi_data.length === 0)
      return respond(res, http_no_content, 'No scribbles found');

    const total = all_data.length;
    const scribbles = pagi_data.map((scribble) => scribble.get({ plain: true }));
    respond(res, http_ok, null, { scribbles, total });
  }

};
