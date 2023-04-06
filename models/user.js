'use strict';
const { DataTypes } = require('sequelize/dist');
const db = require('../config/db');


  const User = db.define(
    'User', {
        
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    }
  }, {    
  });

module.exports = User;