import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/RecipeCard.css";

export const RecipeCard = ({ recipe }) => {
  // console.log(recipe);
  
  return (
    <div className="card h-100 recipe-card border-0">
      {recipe.coverimage && (
        <img
          src={recipe.coverimage}
          alt={recipe.title}
          className="card-img-top object-fit-cover recipe-card-img"
        />
      )}
      <div className="card-body">
        <h3 className="card-title h5 mb-3 text-dark">{recipe.title}</h3>
        <p className="text-muted small mb-4">⏲️ {recipe.time} minutes</p>
        <Link
          to={`/recipe/${recipe.id}`}
          className="btn btn-primary w-100 text-uppercase py-2 fw-medium recipe-card-btn"
        >
          View Full Recipe
        </Link>
      </div>
    </div>
  );
};
