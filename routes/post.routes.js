const express= require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");

router.get("/",postCtrl.getAllPosts);
// router.get("/:id",postCtrl.getPost);
router.post("/:id",postCtrl.createPost);
router.patch("/:postId/:userId", postCtrl.updatePost);

module.exports = router;