import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MealPage = ({ recipeId }) => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const appID = "3c552c56";
  const appKey = "43d60ed61fccd8d04608bc7e66814e90";

  useEffect(() => {
    if (!id) return;
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${appID}&app_key=${appKey}`
        );

        setRecipeData(response.data);
      } catch (error) {
        console.log(
          "Error fetching detailed Recipes",
          error.message,
          error.response
        );
      }
    };
    fetchRecipeData();
  }, [recipeId]);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  const { recipe } = recipeData;

  return (
    <div>
      <p>
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
          View the full recipe instructions here
        </a>
      </p>
    </div>
  );
};

export default MealPage;
