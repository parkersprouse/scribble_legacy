// eslint-disable-next-line
'use strict';

const { db, Sequelize } = require('../config/db');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  email:        { type: Sequelize.TEXT, allowNull: false, unique: true },
  name:         { type: Sequelize.TEXT },
  pw_hash:      { type: Sequelize.TEXT, allowNull: false },
  pw_reset_key: { type: Sequelize.TEXT }
};

const table_config = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true,
  indexes: [{
    name: 'users_lowercase_email',
    method: 'BTREE',
    unique: true,
    fields: [db.fn('LOWER', db.col('email'))]
  }]
};

const Users = db.define('users', attributes, table_config);

module.exports = Users;
