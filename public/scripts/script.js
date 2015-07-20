$(function() {

var compiledTemplate = _.template(
  '<div>' +
    '<h1><%= title %></h1>' +
    '<p>'
      'Published by ' +
      '<a href="<%= publisher_url %>">' +
        '<%= publisher %>' +
      '</a>' +
    '</p>' +
    '<h2>Ingredients</h2>' +
    '<ul><% _.each(ingredients, function(i) { %>' +
      '<li> <%= i %> </li>' +
    '<% }); %></ul>' +
  '</div>'
)

var renderedMarkup = compiledTemplate(data);


// recipe template (this is a function)
var compiledTemplate = _.template($('#recipe-template').html());
console.log("this is the compiled template");
console.log(renderedMarkup);







});