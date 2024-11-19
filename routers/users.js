const express = require('express');
const mongoose = require('mongoose');
const usersController = require('../controllers/users');

const router = express.Router();


router.post('/signup',usersController.users_signup);

router.get('/login',usersController.users_login);

router.get('/',usersController.user_getAllUsers);

router.delete('/:uid',usersController.users_deleteUserById);


module.exports = router;

