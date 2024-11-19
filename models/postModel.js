const mongoose = require('mongoose');

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  contactInfo: { type: String, default: null },
  time: { type: String, required: true },
  memberCount: { type: String, required: true },
  category: [{ type: String, required: true }], // Array of strings
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reported: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', postSchema);
