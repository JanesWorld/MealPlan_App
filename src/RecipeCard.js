import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";
import { getRecipeIdFromUri } from "./helper";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  if (!recipe) {
    return null;
  }
  const { id, title, image, servings } = recipe;
  const handleClick = () => {
    navigate(`/meal/${id}`);
  };
  // const recipeID = recipe.idMeal;
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 300,
        height: 400,
      }}
    >
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography>{title}</Typography>
        <Typography>Servings: {servings}</Typography>
        <Button onClick={handleClick}>Go To Recipe</Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
