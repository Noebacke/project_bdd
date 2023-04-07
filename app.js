const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const db = require('./config/db')
const helmet = require("helmet");
const { faker } = require('@faker-js/faker');
const User = require('./models/user');
const Post = require('./models/post');
const Reaction = require('./models/reaction');
const bcrypt = require('bcrypt');


//Se connecter à la base de donnée choisie
try {
    db.authenticate();
    console.log('connecté à la base de donnée MySQL !');
} catch (err) {
    console.error('impossible de se connecter, erreur suivante :', err);
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

    // Pour le premier lancement du serveur decommenter ce qui suit pour créer une série de user/posts/reactions

      // create users
    // const users = Array.from({ length: 1500 }, () => {
    //     return {
    //         email: faker.internet.email(),
    //         password: faker.internet.password(),
    //         user_name: faker.internet.userName(),
    //         last_name: faker.name.lastName()
    //     };
    // });
    // const createdUsers = await User.bulkCreate(users, { returning: true });
    // console.log(`Created ${createdUsers.length} users.`);

    // // create posts for each user
    // const posts = createdUsers.flatMap((user) =>
    //     Array.from({ length: 10 }, () => {
    //         return {
    //             content: faker.lorem.sentence(),
    //             user_id: user.id
    //         };
    //     })
    // );
    // const createdPosts = await Post.bulkCreate(posts, { returning: true });
    // console.log(`Created ${createdPosts.length} posts.`);

    // // create reactions for each post
    // const reactions = createdPosts.flatMap((post) =>
    //     Array.from({ length: 10 }, () => {
    //         return {
    //             content: faker.lorem.word(8),
    //             post_id: post.id,
    //             user_id: createdUsers.find((user) => user.id !== post.user_id).id
    //         };
    //     })
    // );
    // const createdReactions = await Reaction.bulkCreate(reactions, { returning: true });
    // console.log(`Created ${createdReactions.length} reactions.`);
}

initApp();
module.exports = app;
