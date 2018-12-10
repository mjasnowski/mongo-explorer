import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const server = express();

// Express Config
let port = 8080;
let host = "localhost";

// MongoDB Config
let mongoPort = 27017;
let mongoHost = "localhost";
let mdb;

// Establish connection object
MongoClient.connect(`mongodb://${mongoHost}:${mongoPort}`, (err, database) => {
    mdb = database;
    console.log("MongoDB Database Connected To...");
});

// Tell Express to use the current directory for static content for now (i.e. index.html)
server.use(express.static('.'));
// Tell Express to parse message body as JSON documeng
server.use(bodyParser.json());

// Retrieve the database names for a database
server.get('/databases', (req,res) => {
    mdb.db().admin().listDatabases().then( databases => res.send ({databases: databases}));
});

// Retrieve the collection names for a database
server.get(['/databases/:database/collections'], (req,res) => {
    mdb.db(`${req.params.database}`).listCollections().toArray().then (collections => res.send ({collections: collections}));
});

// Retrieve a specific collection from a database
server.get(['/databases/:database/collections/:collection'], (req,res) => {
    mdb.db(`${req.params.database}`).collection(`${req.params.collection}`).find().toArray().then (collection => res.send ({collection: collection }));     
});

// Query a specified collection of a specified database
server.post(['/databases/:database/collections/:collection'], (req,res) => {
    let filter = req.body.filter;
    //console.info("Filter: " + req.body.filter);   
    mdb.db(`${req.params.database}`).collection(`${req.params.collection}`).find(JSON.parse(`${filter}`)).toArray().then (collection => res.send ({collection: collection }));    
});

// Retrieve Database Statistics
server.get(['/databases/:database/stats'], function(req, res) {
    mdb.db(`${req.params.database}`).stats().then (stats => res.send ({stats: stats }));     
});

// Start the BackEnd Server
server.listen(port,host, () => {
    console.info("MongoDB Explorer Server listening on ", host, port);
});