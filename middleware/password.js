const passwordValidator = require('../models/passwordModel');

module.exports = (req,res,next) => {
    if(passwordValidator.validate(req.body.password)){
        next()
    }
    else{
        return res.status(400)
        .json({message : 'le mot de passe doit faire au minimum 10 caractères,une majuscule,une minuscule et un chiffre'})
    }
}