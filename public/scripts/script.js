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

  // ROUTE TO SERVER
  $.get('/food2fork', function(data) {
    recipes = JSON.parse(data);
    // console.log(recipes.recipes[0].title);
    // console.log($recipeTemplate);
    render();
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
  //     f2f_url: "http://food2fork.com/view/47024",
  //     title: "Perfect Iced Coffee",
  //     source_url: "http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/",
  //     recipe_id: "47024",
  //     image_url: "http://static.food2fork.com/icedcoffee5766.jpg",
  //     social_rank: 100,
  //     publisher_url: "http://thepioneerwoman.com"
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