import React, { useEffect, useState } from "react";
import { RecipeList } from "../components/RecipeList";
import { fetchRecipe } from "../api/recipeAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css";

export const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    try {
      const res = await fetchRecipe();
      setRecipes(res.data);
      console.log(res.data);
      console.log(recipes);
      
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <header className="mb-5">
        <h1 className="homepage-title text-center pb-3 border-bottom border-3 border-primary fw-light display-4 text-dark transition-all">
          All Recipes
        </h1>
        <p className="text-center text-muted fs-5">
          Discover a world of delicious recipes curated just for you.
        </p>
      </header>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        <div className="row g-4">
          <RecipeList recipes={recipes} />
        </div>
      )}
    </div>
  );
};
