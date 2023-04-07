'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config/db');


    const Reactions = db.define(
      "reactions",
      {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content: { 
            type: DataTypes.STRING(10), 
            required: true 
        }
      },
      {}
    );

module.exports = Reactions