 // finalProj
 // * =================== 

// The url library allows us to parse parts of the request url.
var url = require("url");
var http = require("http");
var fs = require("fs");

// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
// var mongoose = require("mongoose");
var logger = require('morgan');
var bodyParser = require('body-parser');
var server = http.createServer(handleRequest);

// Require app
// var App = require("./app/ldPDFnNode");
// require("./app/app")(app);
// require("./app/ldPDFnNode")(app);

// var request = require("request");     // Snatches HTML from URLs
// var cheerio = require("cheerio");     // Scrapes our HTML

// Initialize Express
var app = express();

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// We need a function which handles requests and send response
function handleRequest(req, res) {

  // Capturing the url the request is made to.
  var urlParts = url.parse(req.url);

  // When we visit different urls, the switch statement call on different functions.
  switch (urlParts.pathname) {
    case "/":
      displayRoot(urlParts.pathname, req, res);
      break;
    case "techdocs":
      displayTechdocs(urlParts.pathname, req, res);
      break;
    case "wpar":
      displayWpar(urlParts.pathname, req, res);
      break;
    case "lrgPg":
      displayLrgPg(urlParts.pathname, req, res);
      break;
    case "grpProjs":
      displayGrpProjs(urlParts.pathname, req, res);
      break;
    case "resume":
      displayResume(urlParts.pathname, req, res);
      break; 
    case "/edit":
      console.log("display edit");
      break;
    default:
      display404(urlParts.pathname, req, res);
  }
}

// When we visit the "http://localhost:3000/" path, this function is run.
function displayRoot(url, req, res) {
  var myHTML = "<html>";
  myHTML += "<body><h1>I'm Marie, Full Stack Web Developer</h1>";
  myHTML += "<a href='/index'>Portfolio</a>";
  myHTML += "</body></html>";
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(myHTML);
}

// When we visit the "http://localhost:3000/techdocs" path, this function is run.
function displayTechdocs(url, req, res) {
  var myHTML = "<html>";
  myHTML += "<body><h1>Technical Documents</h1>";
  myHTML += "<a href='/'>Go Home</a>";
  myHTML += "</body></html>";
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(myHTML);
}

// When we visit the "http://localhost:3000/grpProjs" path, this function is run.
function displayGrpProjs(url, req, res) {
  var myHTML = "<html>";
  myHTML += "<body><h1>Group Projects</h1>";
  myHTML += "<a href='/'>Go Home</a>";
  myHTML += "</body></html>";
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(myHTML);
}

// When we visit any path that is not specifically defined, this function is run.
function display404(url, req, res) {
  res.writeHead(404, {
    "Content-Type": "text/html"
  });
  res.write("<h1>404 Not Found </h1>");
  res.end("The page you were looking for: " + url + " can not be found ");
}

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});