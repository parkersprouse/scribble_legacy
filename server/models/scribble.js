// eslint-disable-next-line
'use strict';

const { db, Sequelize } = require('../config/db');
const User = require('./user');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  body:         { type: Sequelize.TEXT, allowNull: false },
  title:        { type: Sequelize.TEXT },
  owner_id:     { type: Sequelize.INTEGER, allowNull: false,
                  references: {
                    model: User,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                  }
                }
};

const table_config = {
  timestamps:      true,
  freezeTableName: true,
  underscored:     true
};

const Scribble = db.define('scribbles', attributes, table_config);

module.exports = Scribble;
