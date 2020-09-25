// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { setTimeout } = require('timers');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// GET route, which returns the projectData
app.get('/getData', function(req, res) {
    res.send(projectData);
})

// POST route to add incoming data from front-end to the projectData
app.post('/', function(req, res) {
    let newData = req.body;
    let newEntry = {
        latitude: newData.latitude,
        longtitude: newData.longtitude,
        country: newData.country,
        date: newData.date ,
        city: newData.city
    }
    Object.assign(projectData, newEntry);
})
