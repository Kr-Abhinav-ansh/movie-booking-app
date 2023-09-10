const Genre = require('../models/genre.model'); // Import the Genre model

// Controller function to get all genres
exports.findAllGenres = (req, res) => {
  Genre.find()
    .then((genres) => {
      res.json(genres);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
