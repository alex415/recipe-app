$(function() {

  // compile recipe template
  var $recipeTemplate = _.template($('#recipe-template').html());

  var recipes;
  var index = 0;

  // renders recipe on page
  var render = function(){
    $('#recipe-item').empty();
    $('#recipe-item').append($recipeTemplate({recipe:recipes.recipes[index]}));

    for (var i = 0; i < recipes.recipes.length; i++) {
      $('#saved-recipes').append($recipeTemplate({recipe:recipes.recipes[i]}));  
    }
  };

  // CALL TO SERVER FOR 30 RECIPES
  $.get('/food2fork', function(data) {
    recipes = JSON.parse(data);
    render();
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
      console.log(data);
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
  
    // SEED DATA
  // var recipes = [
  //   {
  //     publisher: "Closet Cooking",
  //     f2f_url: "http://food2fork.com/view/35382",
  //     title: "Jalapeno Popper Grilled Cheese Sandwich",
  //     source_url: "http://www.closetcooking.com/2011/04/jalapeno-popper-grilled-cheese-sandwich.html",
  //     recipe_id: "35382",
  //     image_url: "http://static.food2fork.com/Jalapeno2BPopper2BGrilled2BCheese2BSandwich2B12B500fd186186.jpg",
  //     social_rank: 100,
  //     publisher_url: "http://closetcooking.com"
  //   },
  //   {
  //     publisher: "The Pioneer Woman",
  //     f2f_url: "http://food2fork.com/view/47319",
  //     title: "Crash Hot Potatoes",
  //     source_url: "http://thepioneerwoman.com/cooking/2008/06/crash-hot-potatoes/",
  //     recipe_id: "47319",
  //     image_url: "http://static.food2fork.com/CrashHotPotatoes5736.jpg",
  //     social_rank: 100,
  //     publisher_url: "http://thepioneerwoman.com"
  //   }
  // ];

});