import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import { getRecipeIdFromUri } from "./helper";

const RecipeCard = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const recipeID = recipe.idMeal;
  return (
    <div>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 300,
          height: 400,
        }}
      >
        <CardContent>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            height="200px"
            width="200px"
          ></img>
          <Typography>{recipe.strMeal}</Typography>
          <Typography>Category: {recipe.strCategory}</Typography>
          <Button component={Link} to={`/meal/${recipeID}`}>
            Go To Recipe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeCard;
