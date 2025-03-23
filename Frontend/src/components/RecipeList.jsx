import React from "react";
import { RecipeCard } from "../components/RecipeCard";
import "../styles/RecipeList.css";

export const RecipeList = ({ recipes }) => {
  return (
    <div className="row g-4 recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe._id} className="col-12 col-md-6 col-lg-4">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};
