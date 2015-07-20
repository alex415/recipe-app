$(function() {

  var $recipeTemplate = _.template($('#recipe-template').html()); 

  console.log($recipeTemplate);

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

  $('#recipe-item').append($recipeTemplate(recipe));

  $.ajax({
      url: "http://food2fork.com/api/search?key=c75d4d5e1941dafbbdc4b6d0ba39b1cf",
      type: "GET",
      success: function(data) { },
      error: function(jqXHR, textStatus, errorThrown) { }
  });






















// var compiledTemplate = _.template(
//   '<div>' +
//     '<h1><%= title %></h1>' +
//     '<p>'
//       'Published by ' +
//       '<a href="<%= publisher_url %>">' +
//         '<%= publisher %>' +
//       '</a>' +
//     '</p>' +
//     '<h2>Ingredients</h2>' +
//     '<ul><% _.each(ingredients, function(i) { %>' +
//       '<li> <%= i %> </li>' +
//     '<% }); %></ul>' +
//   '</div>'
// )

// var renderedMarkup = compiledTemplate(data);


// // recipe template (this is a function)
// var compiledTemplate = _.template($('#recipe-template').html());
// console.log("this is the compiled template");
// console.log(renderedMarkup);

});