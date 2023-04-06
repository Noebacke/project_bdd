const express= require('express');
const router = express.Router();
const ReactionsCtrl = require('../controllers/Reactions.controller');
const auth = require('../middleware/auth');

router.get("/",auth,ReactionsCtrl.getAllReactionss);
router.post('/:id/like', auth,ReactionsCtrl.likeReact);
router.delete("/:id",auth,ReactionsCtrl.deleteReactions);

module.exports = router