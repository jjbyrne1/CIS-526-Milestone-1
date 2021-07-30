const templates = require('../templates');

module.exports = function(req, res) {
  var form = templates["signin.html"]({
    errorMessage: ""
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