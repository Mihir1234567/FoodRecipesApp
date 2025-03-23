import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipeById, updateRecipe } from "../api/recipeAPI";
import "../styles/EditRecipePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    coverImage: "",
  });

  useEffect(() => {
    fetchRecipeById(id)
      .then((res) => setFormData(res.data.data))
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(id, formData)
      .then(() => navigate(`/recipe/${id}`))
      .catch((err) => alert("Update failed!"));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, coverImage: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="container py-5 edit-recipe-page">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 display-5 text-center">Edit Recipe</h2>

          <form
            onSubmit={handleSubmit}
            className="card shadow-sm p-4 form-card"
          >
            {/* Title Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Recipe Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter recipe title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="form-label fw-medium">Recipe Image</label>
              <div className="input-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control"
                />
              </div>
              {formData.coverImage && (
                <div className="mt-3 text-center image-preview">
                  <img
                    src={formData.coverImage}
                    alt="Current recipe"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "200px" }}
                  />
                  <p className="text-muted small mt-2">Current Image Preview</p>
                </div>
              )}
            </div>

            {/* Ingredients Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Ingredients</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="List ingredients (separate with new lines)"
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData({ ...formData, ingredients: e.target.value })
                }
              />
            </div>

            {/* Instructions Field */}
            <div className="mb-4">
              <label className="form-label fw-medium">Instructions</label>
              <textarea
                className="form-control"
                rows="6"
                placeholder="Step-by-step instructions"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
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
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
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
}
