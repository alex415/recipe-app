// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require('underscore');

// connect to mongodb
mongoose.connect('mongodb://localhost/food_project');

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// STATIC ROUTES

// homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// API ROUTES

// get recipe
app.get('/api/recipe', function (req, res) {
// var url="http://food2fork.com/api/search?key=c75d4d5e1941dafbbdc4b6d0ba39b1cf"
  // send recipe as JSON response
  res.json(recipe);
});






// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});