const Post = require("../models/post");
const User = require('../models/user');
const Reactions = require('../models/Reaction')
const createReactionsForPost = require('./Reactions.controller/createReactions')

module.exports.getAllPosts = async (req, res, next) => {
    await Post.findAll({
      include: [ Reactions, User ],
    })
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(500).json({ error }));
  };

module.exports.getPost = async ( req, res, next) => {
    const onePost = {}
    await Post.findOne({where : {id: req.params.id}})
        .then(post => {
            onePost.id = post.id
            onePost.content = post.content
            onePost.user_id = post.user_id
            res.status(200).json(onePost)
            console.log(onePost);
        })
        .catch(error => res.status(404).json({ error }))
};


module.exports.deletePost = async ( req, res, next) => {
    const post = await Post.findOne({where: { id: req.params.id} });

    if (post.userId != req.auth) {
        return res.status(400).json({
        error: new Error("Requête non autorisée"),
        }),
        console.log('Vous navez pas les droits nécéssaires');
    }

    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((error) => res.status(404).json({ error }));
};

module.exports.createPost = async (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
  
    delete postObject.id;
    const userId = req.auth
    const content = req.body.content

    const createdPost = await Post.create({
        content: content,
        user_id: userId,
    });

    await Reactions.create({
        user_id: req.auth,
        post_id: createdPost.id,
        likes: 0,
        dislikes: 0,
        user_react: [],
    });

    console.log(createdPost, createdReactions);
    createdPost.save()
      .then(() => res.status(201).json({ message : "Le post a été ajouté" }))
      .catch((error) => res.status(404).json({ message : "Il y a eu une erreur suite à la création du post" }));
};

module.exports.updatePost = async (req, res, next) => {
    const post = await Post.findOne({where: { id: req.params.id} });
  
    if (post.user_id != req.auth) {
      return res.status(400).json({
        error: new Error("Requête non autorisée"),
      }),console.log('Vous navez pas les droits nécéssaires');
    }
    
    const postObject = { ...req.body };
  
    post.update({
        content: postObject.content
      })
      .then(() => res.status(200).json({ message: "Post modifié" }))
      .catch((error) =>
        res.status(404).json({ error: "erreur lors de l'update" })
      );
  };

