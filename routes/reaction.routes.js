const express= require('express');
const router = express.Router();
const ReactionsCtrl = require('../controllers/reaction.controller');

router.get("/",ReactionsCtrl.getAllReactionss);
router.post('/:userId/:postId',ReactionsCtrl.createReactions);


module.exports = router