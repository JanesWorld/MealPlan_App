import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./RecommendedPage.css";
import mockData from "./mockData.json";

const RecommendedPage = ({ selectedCategory }) => {
  const macroAPIKey = "cc6ee455a8654d52a2366389a365f39f";
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // let callPoints = parseInt(localStorage.getItem("callPoints")) || 0;
    let callPoints = 160;
    console.log("Call Points:", callPoints);
    const fetchRecipes = async () => {
      if (callPoints < 150) {
        try {
          console.log("Making API Call..."); // Add this line
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${macroAPIKey}&type=${selectedCategory}&number=6&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
          );
          console.log("API Call Success"); // Add this line
          callPoints += 5;
          localStorage.setItem("callPoints", callPoints);
          console.log("Updated call points", callPoints);

          const recipesData = response.data.results;
          console.log(recipesData);
          const recipesWithMacroData = await Promise.all(
            recipesData.map(async (recipeData) => {
              const macroResponse = await axios.get(
                `https://api.spoonacular.com/recipes/${recipeData.id}/nutritionWidget.json?apiKey=${macroAPIKey}`
              );
              const macroData = macroResponse.data;
              return { ...recipeData, macroData };
            })
          );
          setRecipes(recipesWithMacroData);
        } catch (error) {
          console.log("Error fetching recipes", error.message, error.response);
        }
      } else {
        console.log("API Call Max reached. Switching to mock data");
        setRecipes(mockData.results);
      }
    };
    fetchRecipes();
  }, [selectedCategory]);

  return (
    <div>
      <h2>Recommended Recipes for you </h2>
      <Container>
        <div className="recipe-container">
          {recipes.length === 0 && <p>No Recipes Found</p>}
          {recipes.slice(0, 6).map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link
                to={{
                  pathname: `/meal/${recipe.id}`,
                  state: { from: location },
                }}
              >
                <RecipeCard recipe={recipe} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RecommendedPage;
