const db = require('../database');
const templates = require('../templates');
const sanitizeHTML = require('sanitize-html');
const serveError = require('../serve-error');
const parseCookie = require('../parse-cookie');

/** @function createRequests()
 * Creates a new request using the supplied form data
 */
function createRequests(req, res) {
  
  var cookie;
  if (req.header.cookie) {
    cookie = parseCookie(req.header.cookie);
    console.log(cookie);
  }
  
  
  // Get the request data from the form
  const id = parseInt(req.params.id, 10);
  var request = req.body.request;
  var fulfilled = 1;
  if (req.body.fulfilled == undefined) fulfilled = 0;
  
  console.log("Box ID:" + id)
  console.log("Body of request: " + request);
  console.log("Fulfilled?: " + fulfilled);
  
  if(!request || fulfilled == undefined) return serveError(req, res, 422, "Empty title or content encountered");
  
  request = sanitizeHTML(request);
  
  // Publish the post to the database
  var info = db.prepare("INSERT INTO requests (box_id, request, fulfilled) VALUES (?, ?, ?)").run(id, request, fulfilled);
  
  // Determine if the write succeeded
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");

  // Redirect to the read page for the post
  res.statusCode = 302;
  res.setHeader("Location", `/box-locations/${id}`);
  res.end();
}

module.exports = createRequests;