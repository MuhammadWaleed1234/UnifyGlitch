const Admin = require('../models/adminModel');

// Middleware to Verify Admin Access
exports.verifyAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body; // Ensure userId is sent in the request

    const admin = await Admin.findOne({ user: userId });
    if (!admin) {
      return res.status(403).json({ message: 'Access restricted to admins only' });
    }

    next(); // Proceed if the user is an admin
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
