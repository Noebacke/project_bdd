const express= require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require('../middleware/auth');

router.get("/",auth,postCtrl.getAllPosts);
router.get("/:id",auth,postCtrl.getPost);
router.post("/",auth,postCtrl.createPost);
router.put("/:id",auth, postCtrl.updatePost);
router.delete("/:id",auth,postCtrl.deletePost);

module.exports = router;