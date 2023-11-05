import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { Container, Grid } from "@mui/material";
import axios from "axios";

const LatestRecipes = () => {
  const [latestRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        let recipes = [];
        for (let i = 0; i < 3; i++) {
          const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          recipes.push(response.data.meals[0]);
        }
        setLatestRecipes(recipes);
      } catch (error) {
        console.log("Error", error.message, error.response);
      }
    };
    fetchLatestRecipes();
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F7EEE0",
      }}
    >
      <Grid container marginBottom="40px">
        <Grid item xs={12} marginBottom="20px">
          <h2>Latest Recipes</h2>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          {Array.isArray(latestRecipes) &&
            latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LatestRecipes;
