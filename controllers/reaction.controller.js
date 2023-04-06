const Reaction = require('../models/reaction')
const Post = require("../models/post");
const User = require('../models/user');

module.exports.getAllReactions = async (req, res, next) => {

    await Reaction.findAll({
      include: [ Post, User ],
    })
      .then((reactions) => {
        res.status(200).json(reactions);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    
};

module.exports.deleteReaction = async ( req, res, next) => {
    const reaction = await Reaction.findOne({where: { id: req.params.id} });
    const user = await User.findOne({where: { id: req.auth} });

    if (reaction.userId != req.auth && user.admin != true) {
      return res.status(400).json({
        error: new Error("Requête non autorisée"),
      }),console.log('Vous navez pas les droits nécéssaires');
    }
    await Reaction.destroy({where : {id: req.params.id}})
      .then(() => res.status(200).json({ message: "Reaction supprimée" }))
      .catch((error) => res.status(404).json({ error }));
};

// module.exports.createReaction = async (req, res, next) => {
    
//     const createReaction = await Reaction.create({
//         ... req.body,
//         user_id: req.auth,
//         post_id: req.body.postId,
//         likes: 0,
//         dislikes: 0,
//         user_react: [],
//     });
  
//     console.log(createReaction);
//     createReaction
//       .save()
//       .then(() => res.status(201).json({ message : "La reaction a été ajoutée" }))
//       .catch((error) => res.status(404).json({ error }));
// }

exports.likeReact = (req, res, next) => {
    let like = req.body.likes;
    let userId = req.body.user_id;
    let reactionId = req.params.id;
    
    if(!reactionId){
        res.status(400).json({ message: 'Bad request. reactionId is not defined in the body'})
    }
    
    switch (like) {
        
        case 1 :
            Reaction.findOne({_id: reactionId})
                .then((reation) => {
                    if(reaction.user_react.includes(userId)){
                        res.status(200).json({message: 'Vous avez déjà aimé cette sauce'});
                    }
                    else{
                        Reaction.findOne({_id: reactionId})
                        .then((reaction) => {
                            reaction.user_react.push(userId)
                            reaction.likes += 1;
                            reaction.save();
                        })
                        .then(() => res.status(200).json({ message: `J'aime` }))
                        .catch((error) => res.status(500).json({ error })) 
                    }
                })
          break;
    
        case 0 :  
            Reaction.findOne({ _id: reactionId })
            .then((reaction) => {
                if (reaction.user_react.includes(userId)) { 
                    Reaction.findOne({ _id: sauceId})
                    .then((reaction) => {
                        reaction.user_react.pull(userId)
                        reaction.likes -= 1;
                        reaction.save()
                    })
                    .then(() => res.status(200).json({ message: `Donnez votre avis` }))
                    .catch((error) => res.status(500).json({ error }))
                }

                if (reaction.user_react.includes(userId)) { 
                    Reaction.findOne({ _id: sauceId})
                    .then((reaction) => {
                        reaction.user_react.pull(userId)
                        reaction.dislikes -= 1;
                        reaction.save()
                    })
                    .then(() => res.status(200).json({ message: `Donnez votre avis` }))
                    .catch((error) => res.status(500).json({ error }))
                }
            })
            .catch((error) => res.status(404).json({ error }))
          break;
    
        case -1 :
            
            Reaction.findOne({_id: sauceId})
              .then((reaction) =>{
                if(reaction.user_react.includes(userId)){
                    res.status(200).json({message: 'Vous avez déjà dislike cette sauce'});
                }
                else{
                    reaction.user_react.push(userId);
                    reaction.dislikes += 1;
                    reaction.save();
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