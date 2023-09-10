const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// Route to get all movies
router.get('/movies', movieController.findAllMovies);

// Route to get movies by status (PUBLISHED or RELEASED)
router.get('/movies', movieController.findAllMoviesByStatus);

// Route to get a movie by its ID
router.get('/movies/:movieId', movieController.findOne);

// Route to search for movies by various criteria
router.get('/movies/search', movieController.searchMovies);

module.exports = router;
