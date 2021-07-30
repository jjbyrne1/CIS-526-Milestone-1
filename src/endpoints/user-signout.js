const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');
const parseCookie = require('../parse-cookie');

/** @function createSession
 * A helper method invoked when session creation is
 * successful.  The request should have an object
 * as its body parameter with username and password set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function signOut(req, res) {
  // Create the session
  console.log(req.headers.cookie);
  var cookie = parseCookie(req.headers.cookie);
  var user = cookie["user-id"];
  
  var user = db.prepare("SELECT * FROM users WHERE id = ?").get(user);
  
  //var email = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if(!user) return failure(req, res, "Email/Password not found.  Please try again.");
  else return success(req, res, user);
}

/** @function success
 * Helper function for creating the user session after 
 * a successful login attempt.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {object} user - the user who signed in
 */
function success(req, res, user) {
  var data = `user-id:deleted; loggedin:${0};`;
  res.setHeader('Set-Cookie', `user-id=null;`);
  res.serHeader('Set-Cookie', `loggedin=0;`);
  res.end(`You have successfully been logged out!`);
}

/** @function failure 
 * A helper function for reporting issues logging a 
 * user in.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - the error message for the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "Unable to sign out user";
  res.end();
}

module.exports = signOut;