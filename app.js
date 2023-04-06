const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const db = require('../back-end/config/db')
const helmet = require("helmet");
const User = require('./models/user');
const Post = require('./models/post');
const Reaction = require('./models/reaction');


//Se connecter à la base de donnée choisie
try {
    db.authenticate();
    console.log('connecté à la base de donnée MySQL !');
} catch (err) {
    console.error('impossible de se connecter, erreur suivante :', error);
}

//Associations

Post.hasMany(Reaction)
Reaction.belongsTo(Post)
User.hasMany(Post)
Post.belongsTo(User)
Reaction.belongsTo(User)
User.hasMany(Reaction)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',  `${process.env.CLIENT_URL}`);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const initApp = async function (){
    await db.sync()
} 

initApp();
module.exports = app;
