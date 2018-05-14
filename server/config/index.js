// eslint-disable-next-line
'use strict';

var config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: process.env.DB_SSL
  },
  jwt_secret: process.env.JWT_SECRET
  //sparkpost_key: process.env.SPARKPOST_API_KEY
}

module.exports = config
