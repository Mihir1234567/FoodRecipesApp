import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteRecipeById, fetchRecipeById } from "../api/recipeAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Button from "react-bootstrap/Button";
import "../styles/RecipeDetailPage.css";

export const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  const fetchById = async () => {
    try {
      const res = await fetchRecipeById(id);
      setRecipe(res.data.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const deleteRecipe = async () => {
    try {
      await deleteRecipeById(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  return (
    <div className="container my-5 recipe-detail-page">
      {recipe && (
        <div className="recipe-detail">
          {/* Header Section */}
          <header className="text-center mb-5">
            <h1 className="display-4 mb-4 recipe-title border-bottom pb-3 border-primary">
              {recipe.title}
            </h1>
            {recipe.coverImage && (
              <div className="mb-5 shadow-lg rounded-3 overflow-hidden recipe-cover-container">
                <img
                  src={recipe.coverImage}
                  alt={recipe.title}
                  className="img-fluid recipe-cover-image"
                />
              </div>
            )}
          </header>

          {/* Content Grid */}
          <section className="row g-5">
            {/* Ingredients */}
            <div className="col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">Ingredients</h2>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {recipe.ingredients.split("\n").map((item, index) => (
                      <li key={index} className="list-group-item">
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="col-lg-8">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-success text-white">
                  <h2 className="h4 mb-0">Instructions</h2>
                </div>
                <div className="card-body">
                  <div
                    className="lead text-muted recipe-instructions"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {recipe.instructions}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="d-flex gap-3 justify-content-center mt-5">
            <Button
              as={Link}
              to={`/edit/${id}`}
              variant="primary"
              size="lg"
              className="px-5 py-3"
            >
              Edit Recipe
            </Button>
            <Button
              onClick={deleteRecipe}
              variant="danger"
              size="lg"
              className="px-5 py-3"
            >
              Delete Recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
