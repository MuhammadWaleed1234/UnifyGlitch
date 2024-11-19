const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const BlockedUser = require('../models/blockedUserModel');
const Admin = require('../models/adminModel');



exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is blocked
    const isBlocked = await BlockedUser.findOne({ user: user._id });
    if (isBlocked) {
      return res.status(403).json({ message: 'User is blocked' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user is an admin
    const isAdmin = await Admin.findOne({ user: user._id });

    // Respond with userId and admin status
    return res.status(200).json({
      user:user,
      isAdmin: !!isAdmin, // Include admin status
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


  

// Create User with Profile Picture
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, contactInfo, organization } = req.body;
    const profilePicture = req.file ? req.file.path : null; // Path of the uploaded file

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    const user = new User({ username, email, password, contactInfo, profilePicture, organization });
    await user.save();

    return res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update Profile Picture
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.profilePicture = req.file.path;

      // Delete the old profile picture if it exists
      const user = await User.findById(userId);
      if (user && user.profilePicture) {
        fs.unlinkSync(user.profilePicture); // Delete the file from the server
      }
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.getUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select('-password'); // Exclude password
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Add the full URL for the profile picture
      const fullProfilePictureUrl = user.profilePicture
        ? `${req.protocol}://${req.get('host')}/${user.profilePicture}`
        : null;
  
      return res.status(200).json({
        ...user.toObject(),
        profilePicture: fullProfilePictureUrl, // Return the full URL
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
