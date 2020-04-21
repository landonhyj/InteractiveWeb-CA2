var logger = require("morgan"),
cors = require("cors"),
http = require("http"),
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require('mongoose');

var app = express();
var port = process.env.port || 3000;
var userCtrl = require();

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(require('./routes'));

app.listen(port, function(err){
    console.log("Listening on Port" + port)


});
