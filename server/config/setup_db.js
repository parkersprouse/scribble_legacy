/** @module config/setup_db */
'use strict';

const Scribble = require('../models/scribbles');
const User = require('../models/users');

/**
 * Creates the database by dropping all existing tables and creating new ones.
 * @function
 * @async
 * @returns {void}
 */
async function setup() {
  // DROP ALL TABLES
  await Scribble.drop();
  await User.drop();

  // CREATE ALL TABLES
  await User.sync();
  await Scribble.sync();
}

module.exports = setup;
