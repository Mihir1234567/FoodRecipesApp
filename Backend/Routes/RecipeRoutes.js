const router = require("express").Router();
const recipesController = require("../Controller/RecipesController");

router.post("/addRecipe", recipesController.addRecipe);
router.get("/", recipesController.getAllRecipe);
router.get("/:id", recipesController.getRecipeById);
router.delete("/deleteById/:id", recipesController.deleteRecipeById);
router.put("/updateRecipe/:id", recipesController.updateRecipe);
module.exports = router;
