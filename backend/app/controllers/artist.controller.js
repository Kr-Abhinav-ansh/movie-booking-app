const Artist = require('../models/artist.model'); // Import the Artist model

// Controller function to get all artists
exports.findAllArtists = (req, res) => {
  Artist.find()
    .then((artists) => {
      res.json(artists);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
