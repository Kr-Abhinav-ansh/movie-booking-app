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


const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    const path = url.split('?'[0]); // just splitting the path

    if (method == 'GET') {
        if (path == '/movies') {
            const client = new MongoClient(mongoUrl, { userNewUrlParser: true });
            await client.connect();
            const db = client.db('moviesdb');
            const moviesCollection = db.collection('movies');
            const movieData = await moviesCollection.find().toArray();
            res.writeHead(200, { 'contect-type': 'application/json' });
            res.end(JSON.stringify(movieData));
        }
    }

    if (method =='GET') {
        if (path == '/artists') {
            const client = new MongoClient(mongoUrl, {userNewUrlParser: true});
            await client.connect();
            const db = client.db('moviesdb');
            
        }
    }
})


