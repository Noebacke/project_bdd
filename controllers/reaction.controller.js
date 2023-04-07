const Reactions = require('../models/Reaction')
const Post = require("../models/post");
const User = require('../models/user');

module.exports.getAllReactionss = async (req, res, next) => {

    await Reactions.findAll({
      include: [ Post, User ],
    })
      .then((Reactionss) => {
        res.status(200).json(Reactionss);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
};

module.exports.deleteReactions = async ( req, res, next) => {
    const Reactions = await Reactions.findOne({where: { id: req.params.id} });
    const user = await User.findOne({where: { id: req.auth} });

    if (Reactions.userId != req.auth && user.admin != true) {
      return res.status(400).json({
        error: new Error("Requête non autorisée"),
      }),console.log('Vous navez pas les droits nécéssaires');
    }
    await Reactions.destroy({where : {id: req.params.id}})
      .then(() => res.status(200).json({ message: "Reactions supprimée" }))
      .catch((error) => res.status(404).json({ error }));
};

module.exports.createReactions = async (req, res, next) => {


    
    const createReactions = await Reactions.create({
        ... req.body,
        user_id: req.auth,
        post_id: req.body.postId,
        type: req.body.content,
        user_react: req.auth,
    });
  
    console.log(createReactions);
    createReactions
      .save()
      .then(() => res.status(201).json({ message : "La Reactions a été ajoutée" }))
      .catch((error) => res.status(404).json({ error }));
}

exports.likeReact = (req, res, next) => {
    let like = req.body.likes;
    let userId = req.body.user_id;
    let ReactionsId = req.params.id;
    
    if(!ReactionsId){
        res.status(400).json({ message: 'Bad request. ReactionsId is not defined in the body'})
    }
    
    switch (like) {
        
        case 1 :
            Reactions.findOne({_id: ReactionsId})
                .then((reation) => {
                    if(Reactions.user_react.includes(userId)){
                        res.status(200).json({message: 'Vous avez déjà aimé cette sauce'});
                    }
                    else{
                        Reactions.findOne({_id: ReactionsId})
                        .then((Reactions) => {
                            Reactions.user_react.push(userId)
                            Reactions.likes += 1;
                            Reactions.save();
                        })
                        .then(() => res.status(200).json({ message: `J'aime` }))
                        .catch((error) => res.status(500).json({ error })) 
                    }
                })
          break;
    
        case 0 :  
            Reactions.findOne({ _id: ReactionsId })
            .then((Reactions) => {
                if (Reactions.user_react.includes(userId)) { 
                    Reactions.findOne({ _id: sauceId})
                    .then((Reactions) => {
                        Reactions.user_react.pull(userId)
                        Reactions.likes -= 1;
                        Reactions.save()
                    })
                    .then(() => res.status(200).json({ message: `Donnez votre avis` }))
                    .catch((error) => res.status(500).json({ error }))
                }

                if (Reactions.user_react.includes(userId)) { 
                    Reactions.findOne({ _id: sauceId})
                    .then((Reactions) => {
                        Reactions.user_react.pull(userId)
                        Reactions.dislikes -= 1;
                        Reactions.save()
                    })
                    .then(() => res.status(200).json({ message: `Donnez votre avis` }))
                    .catch((error) => res.status(500).json({ error }))
                }
            })
            .catch((error) => res.status(404).json({ error }))
          break;
    
        case -1 :
            
            Reactions.findOne({_id: ReactionsId})
              .then((Reactions) =>{
                if(Reactions.user_react.includes(userId)){
                    res.status(200).json({message: 'Vous avez déjà dislike cette sauce'});
                }
                else{
                    Reactions.user_react.push(userId);
                    Reactions.dislikes += 1;
                    Reactions.save();
                }
              })
              .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
              .catch((error) => {
                  console.log(error);
                  res.status(500).json({error})
              })
              
          break;
          
        default:
            console.log(error);
    }
}