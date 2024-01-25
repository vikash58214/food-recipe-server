const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const RecipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = RecipeModel;
