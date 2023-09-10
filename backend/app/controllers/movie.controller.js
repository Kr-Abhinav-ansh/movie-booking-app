const Movie = require('../models/movie.model'); // Import the Movie model

// Controller function to search movies by status
exports.findAllMovies = (req, res) => {
  const { status } = req.query;

  Movie.find({ status })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Controller function to fetch all details of a movie by its id
exports.findOne = (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Controller function to fetch details of shows for a specific movie by its id
exports.findShows = (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate('shows') // Assuming you have a 'shows' field in your movie schema that references show documents
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie.shows);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
