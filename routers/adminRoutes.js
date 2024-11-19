const express = require('express');
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Create Admin (Restricted to existing admins)
router.post('/create', adminMiddleware.verifyAdmin, adminController.createAdmin);

// Get All Admins (Restricted to existing admins)
router.get('/', adminMiddleware.verifyAdmin, adminController.getAllAdmins);

module.exports = router;
