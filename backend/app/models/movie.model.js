const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  movieid: {
    type: Number,
    required: true,
  },
  releaseYear: Number,
  artists_first_name: {
    type: String,
    required: true,
  },
  artists_last_name: {
    type: String,
    required: true,
  },
  url: {
    Type: String,
    description: "URL of the website"
  },

});

module.exports = mongoose.model('Movie', movieSchema);
