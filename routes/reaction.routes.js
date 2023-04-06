const express= require('express');
const router = express.Router();
const reactionCtrl = require('../controllers/reaction.controller');
const auth = require('../middleware/auth');

router.get("/",auth,reactionCtrl.getAllReactions);
router.post('/:id/like', auth,reactionCtrl.likeReact);
router.delete("/:id",auth,reactionCtrl.deleteReaction);

module.exports = router