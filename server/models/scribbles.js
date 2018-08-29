/** @module models/scribbles */
'use strict';

const { db, Sequelize } = require('../config/db');
const Users = require('./users');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  body:         { type: Sequelize.TEXT, allowNull: false },
  title:        { type: Sequelize.TEXT },
  tags:         { type: Sequelize.ARRAY(Sequelize.TEXT) },
  owner_id:     { type: Sequelize.INTEGER, allowNull: false,
                  references: {
                    model: Users,
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

const Scribbles = db.define('scribbles', attributes, table_config);

module.exports = Scribbles;
