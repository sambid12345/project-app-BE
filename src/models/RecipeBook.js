const mongoose = require("mongoose");


const recipeBookSchema = mongoose.Schema({
    name: {type: String , required:true},
    description: {type: String , required: true},
    imagePath: {type: String , required: true},
    ingredient: [{ name: {type: String, required: true}, amount: {type: String, required: true} }],
    price : {type: Number},
    star: {type: Number},
    height: {type: String}
});

module.exports = mongoose.model("RecipeBook", recipeBookSchema);