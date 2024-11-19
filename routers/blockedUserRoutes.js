const express = require('express');
const blockedUserController = require('../controllers/blockedUserController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Add a User to Blocklist (Admin Only)
router.post('/add', adminMiddleware.verifyAdmin, blockedUserController.addToBlocklist);

// Remove a User from Blocklist (Admin Only)
router.post('/remove', adminMiddleware.verifyAdmin, blockedUserController.removeFromBlocklist);

// Get All Blocked Users (Admin Only)
router.get('/', adminMiddleware.verifyAdmin, blockedUserController.getBlockedUsers);

module.exports = router;
