const Admin = require('../models/adminModel');
const User = require('../models/userModel');

// Add a New Admin
exports.createAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user to promote to admin
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already an admin
    const existingAdmin = await Admin.findOne({ user: userId });
    if (existingAdmin) {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    // Create the admin entry
    const admin = new Admin({ user: user._id, email: user.email });
    await admin.save();

    return res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Admins
exports.getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find().populate('user');
  
      return res.status(200).json({ admins });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  