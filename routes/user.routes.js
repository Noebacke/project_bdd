const router = require('express').Router();
const userController = require('../controllers/user.controller');
const password = require('../middleware/password');
const auth = require('../middleware/auth');

//auth
router.post('/signup',password,userController.signUp);
router.post('/login', userController.login);

//Profil-Page
router.put('/update', auth,userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);
router.get('/', auth,userController.getUser);


module.exports = router;
