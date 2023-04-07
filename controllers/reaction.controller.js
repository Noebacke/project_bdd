const Reactions = require('../models/Reaction')
const Post = require("../models/post");
const User = require('../models/user');

module.exports.getAllReactionss = async (req, res, next) => {
    try {
        //await Reactions.findAll({
        //    include: [ Post, User ],
        //  })
        const reactions = await Reactions.findAll()
        res.status(200).json(reactions)
        return reactions
    }
    catch {
        res.status(500).json({ error })
    }
};

module.exports.deleteReactions = async ( req, res, next) => {
    const Reactions = await Reactions.findOne({where: { id: req.params.id} });
    await Reactions.destroy({where : {id: req.params.id}})
      .then(() => res.status(200).json({ message: "Reactions supprimée" }))
      .catch((error) => res.status(404).json({ error }));
};

module.exports.createReactions = async (req, res, next) => {

    const createReactions = await Reactions.create({
        user_id: req.params.userId,
        post_id: req.params.postId,
        content: req.body.content,
    });
  
    console.log(createReactions);
    createReactions
      .save()
      .then(() => res.status(201).json({ message : "La Reactions a été ajoutée" }))
      .catch((error) => res.status(404).json({ error }));
}
