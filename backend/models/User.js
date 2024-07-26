// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user' // Default role is 'user'
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
