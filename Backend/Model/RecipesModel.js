const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    ingredients: {
      type: String,
      require: true,
    },
    instructions: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      //   require: true,
    },
    coverImage: {
      type: String,
      //   require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Recipes", recipeSchema);
