import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MealPage = ({ recipeId }) => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipeData(response.data.meals[0]);
      } catch (error) {
        console.log(
          "Error fetching detailed Recipes",
          error.message,
          error.response
        );
      }
    };
    fetchRecipeData();
  }, [id]);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  const { strInstructions, strMeal } = recipeData;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (recipeData[ingredientKey]) {
      ingredients.push(
        `${recipeData[measureKey]} ${recipeData[ingredientKey]}`
      );
    } else {
      break;
    }
  }

  return (
    <div>
      <h2>{strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      {strInstructions.split(". ").map((instruction, index) => (
        <div key={index}>
          <FormControlLabel
            control={<Checkbox />}
            label={`${index + 1}. ${instruction}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MealPage;
