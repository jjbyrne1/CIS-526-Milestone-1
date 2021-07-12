const db = require('../database');

// This endpoint corresponds to the route
//  /box-locations.json

/** @function boxLocations
 * Serves the box locations page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function boxLocations(req, res) {
  // Get all boxes from the database
  var boxesArray = db.prepare("SELECT * From boxes;").all();

  // Turn that array into a JSON string
  var boxes = JSON.stringify(boxesArray);
  
  console.log(boxes);

  //Serve that JSON string
  res.setHeader('Content-Type', "application/json");
  res.setHeader('Content-Length', boxes.length);
  res.end(boxes);
}

module.exports = boxLocations;
