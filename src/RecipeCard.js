import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const RecipeCard = ({ recipe }) => {
  if (!recipe || !recipe.idMeal) {
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
          backgroundColor: "#2A9D8F",
          boxShadow: "10px 4px 2px rgba(0, 0, 0, 0.15)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            height="70%"
            width="90%"
          ></img>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              paddingTop: "15px",
              height: 60,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recipe.strMeal}
          </Typography>
          <Button
            sx={{
              marginTop: "15px",
              backgroundColor: "#264653",
              "&:hover": {
                backgroundColor: "#E9C46A",
              },
              borderRadius: "20px",
            }}
            variant="contained"
            component={Link}
            to={`/meal/${recipeID}`}
          >
            Go To Recipe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeCard;
