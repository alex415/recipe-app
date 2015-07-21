var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    image_url: String,
    title: String,
    source_url: String,
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;

