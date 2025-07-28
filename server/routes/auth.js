const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', passport.authenticate('local'), authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/status', authController.getAuthStatus);

module.exports = router;