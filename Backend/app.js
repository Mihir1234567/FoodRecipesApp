const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

/* ------------------------------ RecipeRoutes ------------------------------ */
app.use("/Recipe", require("./Routes/RecipeRoutes"));

/* ------------------------------- UserRoutes ------------------------------- */
app.use("/", require("./Routes/UserRoutes.js"));

mongoose.connect("mongodb://127.0.0.1:27017/FoodRecipe").then(() => {
  console.log("Database Connected Successfully");
});

const PORT = 3000;

app.listen(PORT, (err) => {
  console.log(`App is Running at port no ${PORT}`);
});
