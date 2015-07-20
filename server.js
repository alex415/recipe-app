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

  // SEED DATA
  var recipe = {
    "recipe": {
        "publisher": "Closet Cooking",
        "f2f_url": "http://food2fork.com/view/35171",
        "ingredients": [
            "1/4 cup cooked shredded chicken, warm",
            "1 tablespoon hot sauce",
            "1/2 tablespoon mayo (optional)",
            "1 tablespoon carrot, grated",
            "1 tablespoon celery, sliced",
            "1 tablespoon green or red onion, sliced or diced",
            "1 tablespoon blue cheese, room temperature, crumbled",
            "1/2 cup cheddar cheese, room temperature, grated",
            "2 slices bread",
            "1 tablespoon butter, room temperature"
        ],
        "source_url": "http://www.closetcooking.com/2011/08/buffalo-chicken-grilled-cheese-sandwich.html",
        "recipe_id": "35171",
        "image_url": "http://static.food2fork.com/Buffalo2BChicken2BGrilled2BCheese2BSandwich2B5002B4983f2702fe4.jpg",
        "social_rank": 100,
        "publisher_url": "http://closetcooking.com",
        "title": "Buffalo Chicken Grilled Cheese Sandwich"
    }
};

// API ROUTES

// get recipe
app.get('http://food2fork.com/api/search?key=c75d4d5e1941dafbbdc4b6d0ba39b1cf', function (req, res) {
  // send recipe as JSON response
  res.json(recipe);
});






// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});