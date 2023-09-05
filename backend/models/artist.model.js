const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  artistid: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Artist', artistSchema);
