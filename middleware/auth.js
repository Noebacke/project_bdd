const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(" ")[0];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin;
    console.log("decodedToken.admin",decodedToken.admin);
    req.auth =  userId;

    if (req.body.userId && req.body.userId !== userId && admin!== true) {
      throw 'Invalid user ID';
    } else {
      console.log('authentification réussie')
      next();
    }
  } catch {
    res.status(401).json({
      error: ('Authentification non valide')
    });
  }
};



