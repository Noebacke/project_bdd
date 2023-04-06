'use strict';
const { DataTypes } = require('sequelize');
const db = require('../config/db');


    const Reactions = db.define(
      "Reactions",
      {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        likes: { 
            type: DataTypes.NUMBER, 
            required: true 
        },
        dislikes: { 
            type: DataTypes.NUMBER, 
            required: true,
        },
        usersReact: { 
            type: [DataTypes.STRING], 
            required: true 
        },
      },
      {}
    );

module.exports = Reactions