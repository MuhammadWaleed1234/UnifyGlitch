const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String, // Store the file path or URL of the uploaded picture
    default: null,
  },
  organization: {
    type: String,
    required: false,
  },
}, { timestamps: true });

// Pre-save Hook for Password Hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds = 10
  next();
});

// Model Export
module.exports = mongoose.model('User', userSchema);
