const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(10)
.is().max(30)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['passwOrd','Password123',])

module.exports = passwordSchema;