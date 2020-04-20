var http = require('http'), //This module provides the HTTP server functionalities
    path = require('path'),//The path module provides utilities for working with file and directory paths
    xml2js =require('xml2js'),//This module does XML to JSON conversion and also allows us to get from JSON back to XML
    express = require('express'),//This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content
    fs = require('fs'),//This module allows to work witht the file system: read and write files back
    xmlParse = require('xslt-processor').xmlParse,//This module allows us to work with XML files
    xsltProcess = require('xslt-processor').xsltProcess;//The same module allows us to utilise XSL Transformations

var router = express();//The set our routing to be handled by Express
var server = http.createServer(router);//This is where our server gets created

router.use(express.static(path.resolve(__dirname, 'views')));//We define the views folder as the one where all static content will be served
router.use(express.urlencoded({extended: true}));//We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json());// Function to read in XML file and convert it to JSON

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
        fs.readFile(filepath, 'utf8', function(err, xmlStr) {
        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.writeFile(filepath, xml, cb);
}

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res){
    function appendJSON(obj){
    xmlFileToJs('dublinBookstore.xml', function(err, result){
        if(err) throw (err);
        result.bookstore.book[obj.sec_n].details.push({'title': obj.title,'author': obj.author,'year': obj.year, 'price': obj.price});
        //console.log(result);
        jsToXmlFile('dublinBookstore.xml', result, function(err){
        if(err) console.log(err);
            })
        })
    }
    appendJSON(req.body);
    res.redirect('back');
});

// POST request to add to JSON & XML files
router.post('/post/delete', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('dublinBookstore.xml', function(err, result) {
      if (err) throw (err);
      
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.bookstore.book[obj.book].details[obj.details];
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('dublinBookstore.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

});



//We define the root of our website and render index.html located inside the views folder
router.get('/', function(req, res){


    res.render('index');

})



//We define a new route /get/html to be rendering our HTML table that is being generated by applying XSL file to XML
router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('dublinBookstore.xml', 'utf8');//We are reading in the XML file
    var xsl = fs.readFileSync('dublinBookstore.xsl', 'utf8');//We are reading in the XSL file
    var doc = xmlParse(xml); //Parsing our XML file
    var stylesheet = xmlParse(xsl); //Parsing our XSL file

    var result = xsltProcess(doc, stylesheet); //Execute
          
    res.end(result.toString()); //Converting the result into a string before respond to the user

});

//This is where we as the server to be listening to user with a specified IP and Port
server.listen(process.env.port || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server is listening at", addr.address + ":" + addr.port);

});