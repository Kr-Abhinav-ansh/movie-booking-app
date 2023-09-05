const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_first_name: {
    type: String,
    required: true,
    unique: true,
  },
  user_last_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);
