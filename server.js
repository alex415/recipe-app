// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require('underscore'),
    request = require('request'),
    User = require('./models/user'),
    Recipe = require('./models/recipe'),
    session = require('express-session');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/recipe_app' // plug in the db name you've been using
);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// MIDDLEWARE TO MANAGE SESSIONS
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

// finds user currently logged in based on `session.userId`
req.currentUser = function (callback) {
  User.findOne({_id: req.session.userId}, function (err, user) {
    var user = req.user;
    callback(null, user);
  });
};

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// STATIC ROUTES

// homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// API ROUTES

// get recipe
app.get('/food2fork', function (req, res) {
  // var page = req.body.page;
  request('http://food2fork.com/api/search?key=c75d4d5e1941dafbbdc4b6d0ba39b1cf', function (error, response, body) {
    res.json(body);
  });
});

// get recipes of current user
app.get('/recipes', function (req, res) {
  req.currentUser(function (err, user) {
    res.json(user.recipes);
  });
});

// create new recipe
app.post('/recipes', function (req, res) {
  // create new recipe with form data (`req.body`)
  var newRecipe = new Recipe({
    image_url: req.body.image_url,
    title: req.body.title,
    source_url: req.body.source_url
  });
  newRecipe.save();
  // set the value of the id
  var targetId = req.session.userId;
  // find phrase in db by id
  User.findOne({_id: targetId}, function (err, foundUser) {
    foundUser.recipes.push(newRecipe);
    foundUser.save(function (err, savedUser) {
      res.json(savedUser);
    });
  });
});


    // targetId = req.params.id
    // User.findOne({_id:targetId}, function(err, idea){
        // var foundIdea = idea;
        // console.log('foundIdea: ' + foundIdea);
        // console.log("new comment:" +newComment);
        // console.log(newComment._id);
        // foundIdea.comments.push(newComment._id);
        // foundIdea.save(function (err, savedUser) {
        //   res.json(savedUser);
        // });

    // req.currentUser(function (err, user) {
    //   newRecipe.save();
    //   User.save(function(err, savedUser) {
    //     res.json(newRecipe);
    //   })
//   });
// })

// AUTHORIZATION

// signup route (renders signup view)
app.get('/signup', function (req, res) {
  res.sendFile(__dirname + '/public/views/signup.html');
});

// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    req.login(user);
    res.redirect('/');
  });
});

// AUTHENTICATION

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    if (err) {
      console.log("error" + err);
    }
    else {
      // saves user id to session
      req.login(user);

      // redirect to user profile
      res.redirect('/');
      }
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentUser(function (err, user) {
    res.send('Welcome ' + user.email);
  });
});

// login route (renders login view)
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/views/login.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});