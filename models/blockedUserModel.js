const mongoose = require('mongoose');

const blockedUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    reason: {
      type: String,
      default: 'No reason provided', // Optional reason for blocking
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlockedUser', blockedUserSchema);
