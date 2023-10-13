const mongoose = require("mongoose");


const recipeBookSchema = mongoose.Schema({
    name: {type: String , required:true},
    description: {type: String , required: true},
    imagePath: {type: String , required: true},
    ingredient: [{ name: {type: String, required: true}, amount: {type: String, required: true} }],
    price : {type: String, required: true},
    star: {type: String, required: true},
    height: {type: String, required: true}
});

module.exports = mongoose.model("RecipeBook", recipeBookSchema);