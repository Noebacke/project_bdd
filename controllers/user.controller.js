const UserModel = require('../models/user');
const Post = require("../models/post");
const Reactions = require('../models/Reaction')

module.exports.getUser = async ( req, res, next) => {
    try {
        const users = await UserModel.findAll({include: [ Post, Reactions ]})
        res.status(200).json(users)
        return users
    }
    catch{
        error => res.status(404).json({ error })
    }
    
}