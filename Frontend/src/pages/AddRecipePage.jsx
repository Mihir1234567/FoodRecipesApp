import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api/recipeAPI";
import "../styles/AddRecipePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export const AddRecipePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("ingredients", data.ingredients);
      formData.append("instructions", data.instructions);
      formData.append("time", data.time);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await addRecipe(formData);
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to add recipe");
    }
  };

  return (
    <div className="container py-5 add-recipe-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 display-5 text-center">Add New Recipe</h2>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="card shadow-sm p-4 form-card"
          >
            {/* Title Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Recipe Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`form-control form-control-lg ${
                  errors.title ? "is-invalid" : ""
                }`}
                placeholder="Enter recipe title"
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title.message}</div>
              )}
            </div>

            {/* Ingredients Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Ingredients</label>
              <textarea
                {...register("ingredients", {
                  required: "Ingredients are required",
                })}
                className={`form-control ${
                  errors.ingredients ? "is-invalid" : ""
                }`}
                rows="4"
                placeholder="List ingredients (separate with new lines)"
              />
              {errors.ingredients && (
                <div className="invalid-feedback">
                  {errors.ingredients.message}
                </div>
              )}
            </div>

            {/* Instructions Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Instructions</label>
              <textarea
                {...register("instructions", {
                  required: "Instructions are required",
                })}
                className={`form-control ${
                  errors.instructions ? "is-invalid" : ""
                }`}
                rows="6"
                placeholder="Step-by-step instructions"
              />
              {errors.instructions && (
                <div className="invalid-feedback">
                  {errors.instructions.message}
                </div>
              )}
            </div>

            {/* Time & Image Upload Row */}
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Cooking Time (minutes)
                </label>
                <input
                  type="number"
                  {...register("time", {
                    required: "Time is required",
                    min: {
                      value: 1,
                      message: "Time must be at least 1 minute",
                    },
                  })}
                  className={`form-control ${errors.time ? "is-invalid" : ""}`}
                  min="1"
                />
                {errors.time && (
                  <div className="invalid-feedback">{errors.time.message}</div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Recipe Image</label>
                <div className="input-group">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="form-control"
                    aria-describedby="imageHelp"
                  />
                </div>
                <div id="imageHelp" className="form-text">
                  Recommended ratio: 16:9 (landscape)
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg py-3 fw-medium submit-btn"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
