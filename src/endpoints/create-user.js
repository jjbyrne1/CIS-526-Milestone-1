const bcrypt = require('bcrypt');
const templates = require('../templates');
const db = require('../database');
const serveError = require('../serve-error');
const parseCookie = require('../parse-cookie');

/** @function createUser
 * An endpoint for creating a new user.  The request
 * should have an object as its body parameter with 
 * username, password, and passwordConfirmation set.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function createUser(req, res) {
  
  // Create the user
  var email = req.body.email;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var password = req.body.password;
  var passwordConfirmation = req.body.passwordConfirmation;
  
  if(password !== passwordConfirmation) return failure(req, res, "Your password and password confirmation must match.");
  var existingUser = db.prepare("SELECT * FROM users WHERE firstname = ? AND lastname = ?").get(firstname, lastname);
  if(existingUser) return failure(req, res, `The user already exists`);
  
  const passes = 10;
  bcrypt.hash(password, passes, (err, hash) => {
    if(err) return serveError(req, res, 500, err);
    // Save user to the database
    const passes = 10;
    var info = db.prepare(`INSERT INTO users (email, firstname, lastname, cryptedPassword)
                            VALUES (?, ?, ?, ?);`).run(email, firstname, lastname, hash);
    var user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    console.log(user);
    if(info.changes === 1) success(req, res, user.id);
    else failure(req, res, "An error occurred.  Please try again.");
  });
}

/** @function success 
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userID - the id of the user in the database
 */
function success(req, res, user) {
  var data = `user-id:${user.id}; loggedin:${1};`;
  res.setHeader('Set-Cookie', data);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Location:/")
  res.end(`Welcome ${user.firstname}.  Your account was created successfully!`);
}

/** @function failure 
 * A helper method invoked when user creation fails.
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
  var form = templates["sign-up.html"]({
    errorMessage: errorMessage
  });
  var html = templates["layout.html"]({
    title: "Sign In",
    form: form,
    list: "",
    loggedin: "",
    box: "",
    request: "",
    list: ""
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = createUser;