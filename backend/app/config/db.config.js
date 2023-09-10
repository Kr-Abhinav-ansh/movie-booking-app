const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:9000/moviesdb';

const client = new MongoClient(mongoUrl, 
  { userNewUrlParser: true,
    userUnifiedTopology: true });

module.exports = client;