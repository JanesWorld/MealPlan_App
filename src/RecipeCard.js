import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useFavourites } from "./Context/FavouritesContext";

const RecipeCard = ({ recipe }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();
  if (!recipe || !recipe.idMeal) {
    return null;
  }

  const recipeID = recipe.idMeal;
  const isFavourite = favourites.some((fav) => fav.idMeal === recipeID);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      removeFromFavourites(recipe.idMeal);
    } else {
      addToFavourites(recipe);
    }
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 300,
          height: 380,
          backgroundColor: "#FAF9F6",
          boxShadow: "10px 4px 2px rgba(0, 0, 0, 0.15)",
          position: "relative",
          paddingTop: "32px",
        }}
      >
        <Button
          onClick={handleFavouriteClick}
          sx={{
            position: "absolute",
            top: "0",
            right: "10px",
            minWidth: "unset",
            padding: "5px",
            zIndex: 2,
          }}
        >
          {isFavourite ? <StarIcon /> : <StarOutlineIcon />}
        </Button>

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
          />
          <Typography
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
          </Typography>
          <Button
            sx={{
              backgroundColor: "#264653",
              "&:hover": {
                backgroundColor: "#E9C46A",
              },
              borderRadius: "20px",
              marginTop: "8px",
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
