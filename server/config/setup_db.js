/*
 * Running this function will drop and re-create all of the tables on the database.
 */

const User = require('../models/user');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// I feel dirty doing a forced "wait" between calls,
// but these calls are async and the order they complete
// cannot be guaranteed, which obviously casuses problems
// when it comes to schema dependecies.
// So for now we do this because it gets the job done.
async function setup() {
  // DROP ALL TABLES
  User.drop();
  await sleep(1000);

  // CREATE ALL TABLES
  User.sync();
}

module.exports = setup;
