const db = require('../database');
const templates = require('../templates');
const parseCookie = require('../parse-cookie');

function printCookies(cookie) {
  var cookies = parseCookie(cookie);
  // Print the parsed cookies
  console.log("Cookies:");
  for(var key in cookies) {
    console.log(key, cookies[key]);
  }
  console.log('');
}

function boxLocationDetails(req, res) {
  if(req.header.cookie) printCookies(req.header.cookie);
  
  const id = parseInt(req.params.id, 10);
  console.log("ID: " + id);
  // 1. Select the box-location data AND requests for that box

  db.prepare(`SELECT * FROM boxes 
              LEFT JOIN requests
              ON boxes.id = requests.box_id
              WHERE boxes.id = ?`).all(id);

  var box = db.prepare (`SELECT *
                         FROM boxes
                         WHERE id = ?;`).get(id);
  
  if (box == undefined) return res.writeHead(404).end();

  var boxRequests = db.prepare(`SELECT *
                               FROM requests
                               WHERE box_id = ?`).all(id);
  
  console.log("Box: " + JSON.stringify(box));
  console.log("Box Requests: " + JSON.stringify(boxRequests));
  
  var cookies = parseCookie(req.headers.cookie);
  
  var loggedin = 0;
  if (cookies["loggedin"]) loggedin = cookies["loggedin"];
  
  var boxHtml = templates['box.html']({name: box.name, lat: box.lat, lng: box.lng});
  var listHtml = templates['request-list.html']({requests: boxRequests});
  var requestHtml = templates['new-request.html']({id: box.id});

  // 2. Render a html template with data
  var html = templates['layout.html']({request: requestHtml, list: listHtml,
                                       box: boxHtml, id: box.id, name: box.name,
                                      loggedin: loggedin, form: null, title: "Box Location "+id});
  

  // 3. Serve the rendered html string
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = boxLocationDetails;