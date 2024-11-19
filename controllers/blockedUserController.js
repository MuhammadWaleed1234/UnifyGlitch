const BlockedUser = require('../models/blockedUserModel');

// Add User to Blocklist
exports.addToBlocklist = async (req, res) => {
  try {
    const { email, reason } = req.body;

    // Check if user is already blocked
    const existingBlockedUser = await BlockedUser.findOne({ email });
    if (existingBlockedUser) {
      return res.status(400).json({ message: 'User is already in the blocklist' });
    }

    const blockedUser = new BlockedUser({ email, reason });
    await blockedUser.save();

    return res.status(201).json({ message: 'User added to blocklist', blockedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Remove User from Blocklist
exports.removeFromBlocklist = async (req, res) => {
  try {
    const { email } = req.body;

    const blockedUser = await BlockedUser.findOneAndDelete({ email });
    if (!blockedUser) {
      return res.status(404).json({ message: 'User not found in blocklist' });
    }

    return res.status(200).json({ message: 'User removed from blocklist' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Blocked Users
exports.getAllBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await BlockedUser.find();
    return res.status(200).json(blockedUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
