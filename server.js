//npm packeges that we will use to give server useful functionality
var express = require("express");
var path = require("path");
//creating an express server
var app = express();

var PORT = process.env.PORT || 8080;

//Sets up the express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//require routhes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


//listening the port
app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});