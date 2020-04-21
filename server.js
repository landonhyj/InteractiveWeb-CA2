var logger = require("morgan"),
cors = require("cors"),
http = require("http"),
express = require("express"),
bodyParser = require("body-parser"),
xml2js =require('xml2js'),//This module does XML to JSON conversion and also allows us to get from JSON back to XML
express = require('express'),//This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
fs = require('fs'),//This module allows to work witht the file system: read and write files back
xmlParse = require('xslt-processor').xmlParse,//This module allows us to work with XML files
xsltProcess = require('xslt-processor').xsltProcess,//The same module allows us to utilise XSL Transformations
mongoose = require('mongoose');

var app = express();
var port = process.env.port || 3000;
var bookCtrl = require('./book-controller');

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(require('./routes'));

app.listen(port, function(err){
    console.log("Listening on Port" + port)


});
