const express = require('express');
const boxLocations = require('./endpoints/box-locations.js');
const boxLocationDetails = require('./endpoints/box-location-details.js');
const createRequests = require('./endpoints/create-request.js');
const loadBody = require('./middleware/load-body.js');
const newUser = require('./endpoints/new-user.js');
const createUser = require('./endpoints/create-user');
const newSession = require('./endpoints/new-session');
const createSession = require('./endpoints/create-session');
const basicAuth = require('./middleware/basic-auth');
const signOut = require('./endpoints/user-signout')

/** @module app 
 * The express application for our site
 */
var app = express();

app.get('/box-locations.json', boxLocations);
app.get('/box-locations/:id', boxLocationDetails);

app.post('/box-locations/:id/requests', loadBody, createRequests)

app.get("/sign-up", newUser);
app.get("/signin", newSession);
app.get("/signout", signOut);
app.post("/signin", loadBody, createSession);
app.post("/sign-up", loadBody, createUser);

app.use(express.static('static'));

module.exports = app;