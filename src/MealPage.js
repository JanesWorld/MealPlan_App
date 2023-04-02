import { Button, Checkbox, FormControlLabel, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box } from "@mui/system";
import Grid from "@mui/material/Grid";

const MealPage = () => {
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
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "30px" }}
        alignItems="flex-start"
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
          }}
        >
          <h2 style={{ display: "flex", marginLeft: "80px" }}>{strMeal}</h2>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <img
              src={recipeData.strMealThumb}
              alt={recipeData.strMeal}
              height="300"
              width="320"
            />
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Button
              sx={{
                color: "white",
                backgroundColor: "green",
                ":hover": {
                  backgroundColor: "#0D99FF",
                  color: "black",
                },
              }}
            >
              Choose another meal instead
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "30px" }}>
        <Grid item xs={12}>
          <h3>Ingredients:</h3>
        </Grid>
        <Grid item xs={5}>
          <Box>
            {ingredients.map((ingredient, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                {" "}
                • {ingredient}
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={7}>
          <h3>Instructions:</h3>
          {strInstructions.split(". ").map((instruction, index) => (
            <Grid container key={index} alignItems="flex-start">
              <Grid item xs={11}>
                <Box
                  sx={{
                    borderRadius: "10px",
                    border: "1px solid yellow",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#FFCD29",
                    display: "flex",
                  }}
                >
                  {`${index + 1}. ${instruction}`}
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Checkbox
                  sx={{
                    color: "#0D99FF",
                    "&.Mui-checked": {
                      color: "#0D99FF",
                    },
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealPage;
