const recipesSchema = require("../Model/RecipesModel");
const path = require("path");
const multer = require("multer");
const cloudinaryUtil = require("../util/CloudinaryUtil");

/* --------------------------------- storage -------------------------------- */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/* ------------------------------ multerObject ------------------------------ */

const upload = multer({
  storage: storage,
}).single("image");

/* -------------------------------- AddRecipe ------------------------------- */
// const addRecipe = async (req, res) => {
//   try {
//     const newRecipe = await recipesSchema.create(req.body);
//     res.status(201).json({
//       message: "New Recipe Added Successfully",
//       data: newRecipe,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       data: error.message,
//     });
//   }
// };
/* -------------------------------- AddRecipe ------------------------------- */
const addRecipe = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Handle Cloudinary upload
      const cloudinaryResponse = await cloudinaryUtil.addFileToCloudinary(req.file);
      
      // Handle database operation
      req.body.coverImage = cloudinaryResponse.secure_url;
      const newRecipe = await recipesSchema.create(req.body);

      res.status(201).json({
        message: "Recipe Saved Successfully",
        data: newRecipe,
      });
    } catch (error) {
      console.error("Error in addRecipe:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message
      });
    }
  });
};
/* ------------------------------ GetAllRecipe ------------------------------ */
const getAllRecipe = async (req, res) => {
  try {
    const recipes = await recipesSchema.find();
    res.status(200).json({
      message: "Recipes Fetched Successfully",
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

/* ---------------------------- GetRecipeById ---------------------------- */
const getRecipeById = async (req, res) => {
  try {
    const recipesById = await recipesSchema.findById(req.params.id);
    res.status(200).json({
      message: "Recipe Fetched Successfully",
      data: recipesById,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

/* ---------------------------- deleteRecipeById ---------------------------- */
const deleteRecipeById = async (req, res) => {
  try {
    const recipesById = await recipesSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Recipe Fetched Successfully",
      data: recipesById,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

/* ------------------------------ UpdateRecipe ------------------------------ */
const updateRecipe = async (req, res) => {
  try {
    const updateRecipesById = await recipesSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Recipe Updated Successfully",
      data: updateRecipesById,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

module.exports = {
  addRecipe,
  updateRecipe,
  getAllRecipe,
  getRecipeById,
  deleteRecipeById,
};
