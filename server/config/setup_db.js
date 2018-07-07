// eslint-disable-next-line
'use strict';

const User = require('../models/user');
const Scribble = require('../models/scribble');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Running this function will drop and re-create all of the tables on the database.
//
// I feel dirty doing a forced "wait" between calls,
// but these calls are async and the order they complete
// cannot be guaranteed, which obviously casuses problems
// when it comes to schema dependecies.
// So for now we do this because it gets the job done.
async function setup() {
  // DROP ALL TABLES
  Scribble.drop();
  await sleep(3000);
  User.drop();
  await sleep(3000);

  // CREATE ALL TABLES
  User.sync();
  await sleep(3000);
  Scribble.sync();
}

module.exports = setup;
