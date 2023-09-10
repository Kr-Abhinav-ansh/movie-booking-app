const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    unique: true,
  },
  genreid: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Genre', genreSchema);
