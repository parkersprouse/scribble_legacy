// eslint-disable-next-line
'use strict';

const moment = require('moment');
const validator = require('validator');

const constants = require('../config/constants');
const Scribbles = require('../models/scribbles');

const { db_err_duplicate, http_ok, http_no_content, http_bad_request, http_server_error } = constants;

function respond(res, status, message, content) {
  res.status(status).json({ message, content });
}

module.exports = {

  getAll(req, res, next) {
    Scribbles.findAll()
      .then((data) => {
        const scribbles = data.map((scribble) => scribble.get({ plain: true }));
        respond(res, http_ok, null, scribbles);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get all scribbles', err.message);
      });
  },

  getID(req, res, next) {
    Scribbles.findAll({ where: { id: req.params.id } })
      .then((data) => {
        if (!data || data.length === 0)
          respond(res, http_no_content, 'No scribbles found');
        else {
          const scribbles = data.map((scribble) => scribble.get({ plain: true }));
          respond(res, http_ok, null, scribbles);
        }
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get scribbles', err.message);
      });
  },

  getOwnerID(req, res, next) {
    Scribbles.findAll({ where: { owner_id: req.params.owner_id } })
      .then((data) => {
        if (!data || data.length === 0)
          respond(res, http_no_content, 'No scribbles found');
        else {
          const scribbles = data.map((scribble) => scribble.get({ plain: true }));
          respond(res, http_ok, null, scribbles);
        }
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to get scribbles', err.message);
      });
  },

  add(req, res, next) {
    let { body, title, owner_id } = req.body;
    if (!body) return respond(res, http_bad_request, 'Your scribble cannot be empty');
    if (!title) title = moment().format('MM/DD/YYYY h:mma');
    Scribbles.create({ body, title, owner_id })
      .then((data) => {
        respond(res, http_ok, null, data);
      })
      .catch((err) => {
        respond(res, http_server_error, 'There was an unknown problem when creating your scribble');
      });
  },

  // data[0] is the number of rows affected
  // data[1] is the array containing the returned rows
  // data[1][0] is the first game that was returned
  // data[1][0].dataValues is the object containing the values of the returned row
  update(req, res, next) {
    if (!req.body.body) return respond(res, http_bad_request, 'Your scribble cannot be empty');
    Scribbles.update(req.body, { where: { id: req.body.id }, returning: true })
      .then((data) => {
        if (!data[0])
          respond(res, http_bad_request, 'No scribble updated, check provided ID');
        else
          respond(res, http_ok, null, data[1][0].dataValues);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to update scribble', err.message);
      });
  },

  delete(req, res, next) {
    Scribbles.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data < 1)
          respond(res, http_bad_request, 'No scribble deleted, check provided ID');
        else
          respond(res, http_ok);
      })
      .catch((err) => {
        respond(res, http_server_error, 'Failed to delete scribble', err.message);
      });
  }

};
