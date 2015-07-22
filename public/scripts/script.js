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

  // CALL TO SERVER FOR API REQUEST
  $.get('/food2fork', function(data) {
    recipes = JSON.parse(data);
    render();
  });

  // SAVE RECIPE
  $( "#green-button" ).on( "click", function()
  $.post('/favorites', function(data) {
    recipes = JSON.parse(data);
  });
});


  // CHANGES RECIPE ON CLICK
  $( "#red-button" ).on( "click", function() {
    index ++;
    render();
  });

  $( "#green-button" ).on( "click", function() {
    index ++;
    if (recipes.recipes[index] === undefined) {
      $.get('/food2fork', function(data) {
        recipes = JSON.parse(data);
        console.log("two");
        index = 0;
      });
    } else {
      render();
    }
  });

  


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