const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:9000/moviesdb';


const db = require("/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");

    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


// const server = http.createServer(async (req, res) => {
//     const { method, url } = req;
//     const path = url.split('?'[0]); // just splitting the path

//     if (method == 'GET') {
//         if (path == '/movies') {
//             const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
//             await client.connect();
//             const db = client.db('moviesdb');
//             const moviesCollection = db.collection('movies');
//             const movieData = await moviesCollection.find().toArray();
//             res.writeHead(200, { 'content-type': 'application/json' });
//             res.end(JSON.stringify(movieData));
//         }
//     }

//     if (method == 'GET') {
//         if (path == '/artists') {
//             const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
//             await client.connect();
//             const db = client.db('moviesdb');
//             const artistsCollection = db.collection('artists');
//             const artistData = await artistsCollection.find().toArray();
//             res.writeHead(200, { 'content-type': 'application/json' });
//             res.end(JSON.stringify(artistData));
//         }
//     }

//     if (method == 'GET') {
//         if (path == '/genres') {
//             const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
//             await client.connect();
//             const db = client.db('genresdb');
//             const genresCollection = db.collection('genres');
//             const genresData = await genresCollection.find().toArray();
//             res.writeHead(200, { 'content-type': 'application/json' });
//             res.end(JSON.stringify(genresData));
//         }
//     }
// })


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use CORS middleware to allow requests from other origins
app.use(cors());

// Set the default route for the root path "/"
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
