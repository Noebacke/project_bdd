'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config/db');


    const Post = db.define(
      "post",
      {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      },
      {}
    );

module.exports = Post