const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

const router = express.Router();

// Create a User with Profile Picture
router.post('/', upload.single('profilePicture'), userController.createUser);

// Update User (including profile picture)
router.put('/:userId', upload.single('profilePicture'), userController.updateUser);

// Login Route
router.get('/login', userController.login);

// Other routes
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
