$(function() {

  // compile recipe template
  var $recipeTemplate = _.template($('#recipe-template').html());

<<<<<<< HEAD
  var $favoriteTemplate = _.template($('#favorite-template').html());

  var recipes;
  var index = 0;
  var page = 1;
=======
  var recipes;
  var index = 0;
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849

  // renders recipe on page
  var render = function(){
    $('#recipe-item').empty();
    $('#recipe-item').append($recipeTemplate({recipe:recipes.recipes[index]}));
  };

  // var user

  // CALL TO SERVER FOR 30 RECIPES
<<<<<<< HEAD
  $.get('/food2fork/'+page, function(data) {
=======
  $.get('/food2fork', function(data) {
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
    recipes = JSON.parse(data);
    render();
  });

  // GETTING USERS RECIPES AND APPENDING ON THE PAGE WHEN WE FIRST LOAD
  $.get('/userfood', function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
<<<<<<< HEAD
      $('#saved-recipes').append($favoriteTemplate({recipe: data[i]}));  
    }
=======
      $('#saved-recipes').append($recipeTemplate({recipe: data[i]}));  
    };
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
  });

  // CHANGES RECIPE ON CLICK

  $( "#red-button" ).on( "click", function() {
    index ++;
    render();
  });

  $( "#green-button" ).on( "click", function() {
    console.log(recipes.recipes[index].image_url);
    console.log(recipes.recipes[index].title);
    console.log(recipes.recipes[index].source_url);

    var tempRecipe = {
      image_url: recipes.recipes[index].image_url,
      title: recipes.recipes[index].title,
      source_url: recipes.recipes[index].source_url
    };

    $.post('/recipes', tempRecipe, function(data) {
      // ONCE WE FINISH APPEND SAVED RECIPE ON TO PAGE
      var length = data.recipes.length - 1;
<<<<<<< HEAD
      $('#saved-recipes').append($favoriteTemplate({recipe: data.recipes[length]}));  
=======
      $('#saved-recipes').append($recipeTemplate({recipe: data.recipes[length]}));  
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
    });

      index ++;
      // checks for empty array in recipes
      if (recipes.recipes[index] === undefined) {
<<<<<<< HEAD
        // page ++;
        $.get('/food2fork/'+page, function(data) {
=======
        $.get('/food2fork', function(data) {
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
          recipes = JSON.parse(data);
          console.log("hello");
          index = 0;
        });
      } else {
        render();
      }
  });

  // NAVBAR FADE
  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
<<<<<<< HEAD
    if(scrollTop !== 0)
=======
    if(scrollTop != 0)
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
      $('#nav').stop().animate({'opacity':'0.2'},400);
    else  
      $('#nav').stop().animate({'opacity':'1'},400);
  });
  
  $('#nav').hover(
    function (e) {
      var scrollTop = $(window).scrollTop();
<<<<<<< HEAD
      if(scrollTop !== 0){
=======
      if(scrollTop != 0){
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
        $('#nav').stop().animate({'opacity':'1'},400);
      }
    },
    function (e) {
      var scrollTop = $(window).scrollTop();
<<<<<<< HEAD
      if(scrollTop !== 0){
=======
      if(scrollTop != 0){
>>>>>>> b5f6da74ba0aa89bea188399254ee125a0697849
        $('#nav').stop().animate({'opacity':'0.2'},400);
      }
    }
  );

});