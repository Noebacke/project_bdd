const faker = require('faker');
const bcrypt = require('bcrypt');
const sequelize = require('./db');

// Import des modèles
const User = require('./models/User');
const Post = require('./models/Post');
const Reaction = require('./models/Reaction');

// Définir la relation entre les modèles
User.hasMany(Post, { as: 'posts', foreignKey: 'user_id' });
Post.belongsTo(User, { as: 'author', foreignKey: 'user_id' });

Post.hasOne(Reaction, { as: 'reaction', foreignKey: 'post_id' });
Reaction.belongsTo(Post, { as: 'post', foreignKey: 'post_id' });

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
            return Reaction.create({
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