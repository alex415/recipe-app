$(function() {

  // compile recipe template
  var $recipeTemplate = _.template($('#recipe-template').html());

  var recipes;
  var index = 0;

  // renders recipe on page
  var render = function(){
    $('#recipe-item').empty();
    $('#recipe-item').append($recipeTemplate({recipe:recipes.recipes[index]}));
  };

  // var user

  // CALL TO SERVER FOR 30 RECIPES
  $.get('/food2fork', function(data) {
    recipes = JSON.parse(data);
    render();
  });

  // GETTING USERS RECIPES AND APPENDING ON THE PAGE WHEN WE FIRST LOAD
  $.get('/userfood', function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $('#saved-recipes').append($recipeTemplate({recipe: data[i]}));  
    };
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
      $('#saved-recipes').append($recipeTemplate({recipe: data.recipes[length]}));  
    });

      index ++;
      // checks for empty array in recipes
      if (recipes.recipes[index] === undefined) {
        $.get('/food2fork', function(data) {
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
    if(scrollTop != 0)
      $('#nav').stop().animate({'opacity':'0.2'},400);
    else  
      $('#nav').stop().animate({'opacity':'1'},400);
  });
  
  $('#nav').hover(
    function (e) {
      var scrollTop = $(window).scrollTop();
      if(scrollTop != 0){
        $('#nav').stop().animate({'opacity':'1'},400);
      }
    },
    function (e) {
      var scrollTop = $(window).scrollTop();
      if(scrollTop != 0){
        $('#nav').stop().animate({'opacity':'0.2'},400);
      }
    }
  );

});