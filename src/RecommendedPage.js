import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import "./RecommendedPage.css";

const RecommendedPage = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);
  const appID = "3c552c56";
  const appKey = "43d60ed61fccd8d04608bc7e66814e90";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );

        console.log(response.data.hits);
        setRecipes(response.data.meals);
      } catch (error) {
        console.log("Error fetching recipes", error.message, error.response);
      }
    };
    fetchRecipes();
  }, [selectedCategory]);

  return (
    <div>
      <h2>Recommended Recipes for you </h2>
      <Container>
        <div className="recipe-container">
          {recipes.slice(0, 6).map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecommendedPage;
