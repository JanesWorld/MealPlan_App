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
          backgroundColor: "#FAF9F6",

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
          <h3
            fontWeight="bold"
            style={{
              paddingTop: "6px",
              letterSpacing: "0.1em",
              color: "black",
              height: 30,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {recipe.strMeal}
          </h3>
          <Button
            sx={{
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
