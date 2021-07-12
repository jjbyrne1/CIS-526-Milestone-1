const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const boxLocationDetails = require('./endpoints/box-location-details.js');
const createRequests = require('./endpoints/create-request.js');
const loadBody = require('./middleware/load-body.js');

/** @module app 
 * The express application for our site
 */
var app = express();

app.get('/box-locations.json', boxLocations);
app.get('/box-locations/:id', boxLocationDetails);

app.post('/box-locations/:id/requests', loadBody, createRequests)

app.use(express.static('static'));

module.exports = app;