import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipeById, updateRecipe } from "../api/recipeAPI";
import "../styles/EditRecipePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useForm } from "react-hook-form";

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    image: "",
  });
  const { register, handleSubmit } = useForm({
    defaultValues: async () => {
      const res = await fetchRecipeById(id);
      return res.data;
    },
  });

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("time", data.time);
    formData.append("ingredients", data.ingredients);
    formData.append("instructions", data.instructions);
    formData.append("image", data.image[0]);

    const res = await updateRecipe(id, formData);

    navigate(`/recipe/${id}`);
  };

  return (
    <div className="container py-5 edit-recipe-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 display-5 text-center">Edit Recipe</h2>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="card shadow-sm p-4 form-card"
          >
            {/* Title Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Recipe Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter recipe title"
                {...register("title")}
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="form-label fw-medium">Recipe Image</label>
              <div className="input-group">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  {...register("image")}
                />
              </div>
            </div>

            {/* Ingredients Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Ingredients</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="List ingredients (separate with new lines)"
                {...register("ingredients")}
              />
            </div>

            {/* Instructions Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Instructions</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Step-by-step instructions"
                {...register("instructions")}
              />
            </div>

            {/* Cooking Time */}
            <div className="mb-4">
              <label className="form-label fw-medium">
                Cooking Time (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                min="1"
                {...register("time")}
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-3 justify-content-end mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary px-4"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4">
                Update Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipePage;
