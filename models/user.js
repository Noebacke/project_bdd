'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config/db');


  const User = db.define(
    'user', {

    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
    },
    last_name: {
        type: DataTypes.STRING(50),
    }
  }, {underscored: true, timestamps: false}
  );

module.exports = User;