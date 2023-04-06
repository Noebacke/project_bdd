const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const db = require('./config/db')
const helmet = require("helmet");
const User = require('./models/user');
const Post = require('./models/post');
const Reactions = require('./models/reaction');
const faker = require('faker');
const bcrypt = require('bcrypt');
const sequelize = require('./db');


//Se connecter à la base de donnée choisie
try {
    db.authenticate();
    console.log('connecté à la base de donnée MySQL !');
} catch (err) {
    console.error('impossible de se connecter, erreur suivante :', error);
}

//Associations

Post.hasMany(Reactions)
Reactions.belongsTo(Post)
User.hasMany(Post)
Post.belongsTo(User)
Reactions.belongsTo(User)
User.hasMany(Reactions)

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
    // Générer les 1500 utilisateurs
    const users = Array.from({ length: 1500 }, () => {
        const email = faker.internet.email();
        const password = faker.internet.password();
        const user_name = faker.internet.userName();
        const last_name = faker.name.lastName();
    
        return {
        email,
        password: bcrypt.hashSync(password, 10), // hashage du password
        user_name,
        last_name,
        };
    });
    
    // Créer les utilisateurs en base de données
    (async () => {
        try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    
        // Synchroniser les modèles avec la base de données
        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    
        // Créer les utilisateurs et les posts associés
        await User.bulkCreate(users, { returning: true })
            .then(async (users) => {
            const posts = await Promise.all(
                users.map((user) => {
                return Post.bulkCreate(
                    Array.from({ length: 10 }, () => {
                    return {
                        content: faker.lorem.sentence(),
                        user_id: user.id,
                    };
                    }),
                    { returning: true }
                );
                })
            );
    
            // Créer les reactions associées aux posts
            await Promise.all(
                posts.map((userPosts) => {
                return Reactions.create({
                    likes: Array.from({ length: 10 }, () =>
                    faker.random.boolean()
                    ).filter((bool) => bool === true).length,
                    dislikes: Array.from({ length: 10 }, () =>
                    faker.random.boolean()
                    ).filter((bool) => bool === true).length,
                    usersReact: [],
                    post_id: userPosts[0].id,
                });
                })
            );
    
            console.log('Users, Posts and Reactions have been created successfully.');
            });
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        } finally {
        await sequelize.close();
        console.log('Connection has been closed.');
        }
    })();
} 

initApp();
module.exports = app;
