const UserModel = require('../models/user');

module.exports.getUser = async ( req, res, next) => {
    try {
        const users = await UserModel.findAll()
        res.status(200).json(users)
        return users
    }
    catch{
        error => res.status(404).json({ error })
    }
    
}