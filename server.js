const logger = require('morgan'),
//cors = require("cors"),
http = require('http'),
bodyParser = require('body-parser'),
express = require('express'),//This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
fs = require('fs'),//This module allows to work witht the file system: read and write files back
mongoose = require('mongoose');
require('./models/database');


var app = express();
var port = process.env.port || 3000;
//var bookCtrl = require('./book-controller');

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(require('./routes'));

app.listen(port, function(err){
    console.log("Listening on Port" + port)


});
