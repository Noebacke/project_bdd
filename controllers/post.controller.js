const Post = require("../models/post");
const User = require('../models/user');
const Reactions = require('../models/Reaction')

module.exports.getAllPosts = async (req, res, next) => {
    try {
        //const posts  = await Post.findAll({
        //    include: [ Reactions, User ],
        //  })
        const posts  = await Post.findAll()
        res.status(200).json(posts)
        return posts
    }
    catch {
        res.status(500).json({ error })
    }
};


module.exports.createPost = async (req, res, next) => {
    const content = req.body.content

    const createdPost = await Post.create({
        user_id: req.params.id,
        content: content,
    });

    console.log(createdPost);
    createdPost.save()
      .then(() => res.status(201).json({ message : "Le post a été ajouté" }))
      .catch((error) => res.status(404).json({ message : "Il y a eu une erreur suite à la création du post" }));
};

module.exports.updatePost = async (req, res, next) => {
    const post = await Post.findOne({where: { id: req.params.postId} });
    const user = await User.findOne({where: { id: req.params.userId} });
    
    if(post.user_id != user.id){
        res.status(404).json({ error: "Vous n'êtes pas autorisé à faire cette action" })
    }
  
    post.update({
        content: req.body.content
      })
      .then(() => res.status(200).json({ message: "Post modifié" }))
      .catch((error) =>
        res.status(404).json({ error: "erreur lors de l'update" })
      );
  };

