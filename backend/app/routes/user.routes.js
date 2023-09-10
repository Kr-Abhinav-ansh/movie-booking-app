const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route to create a new user and sign up
router.post('/auth/signup', userController.signUp);

// Route to log in a user
router.post('/auth/login', userController.login);

// Route to log out a user
router.post('/auth/logout/:userId', userController.logout);

module.exports = router;
