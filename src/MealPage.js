import { Button, Checkbox, FormControlLabel, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NutritionChart from "./NutritionChart";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import mockData from "./mockData.json";

const MealPage = () => {
  const macroAPIKey = "cc6ee455a8654d52a2366389a365f39f";
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [macroData, setMacroData] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      // let callPoints = parseInt(localStorage.getItem("callPoints")) || 0;
      let callPoints = 160;

      try {
        if (callPoints < 150) {
          const [recipeResponse, macroResponse] = await Promise.all([
            axios.get(
              `https://api.spoonacular.com/recipes/${id}/information?apiKey=${macroAPIKey}`
            ),
            axios.get(
              `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${macroAPIKey}`
            ),
          ]);
          setRecipeData(recipeResponse.data);
          setMacroData(macroResponse.data);
        } else {
          console.log("API Max reached, reverting to mock data");
          const mockRecipe = mockData.results.find(
            (recipe) => recipe.id === parseInt(id)
          );
          if (mockRecipe) {
            setRecipeData(mockRecipe);
            setMacroData(mockRecipe.macroData);
          } else {
            console.log("RECIPE NOT FOUND IN MOCK DATA ");
          }
        }
      } catch (error) {
        console.log("Error fetching data", error.message, error.response);
      }
    };
    fetchData();
  }, [id]);

  if (!recipeData || !macroData) {
    return <div>Loading...</div>;
  }

  const {
    instructions: strInstructions,
    title: strMeal,
    extendedIngredients,
  } = recipeData;

  const ingredients = [];
  if (extendedIngredients) {
    extendedIngredients.forEach((ingredient) => {
      ingredients.push(
        `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort} ${ingredient.name}`
      );
    });
  }
  // for (let i = 1; i <= 20; i++) {
  //   const ingredientKey = `strIngredient${i}`;
  //   const measureKey = `strMeasure${i}`;

  //   if (recipeData[ingredientKey]) {
  //     ingredients.push(
  //       `${recipeData[measureKey]} ${recipeData[ingredientKey]}`
  //     );
  //   } else {
  //     break;
  //   }

  const chartData = [
    { name: "Protein", value: macroData.protein?.amount || 0 },
    { name: "Carbs", value: macroData.carbs?.amount || 0 },
    { name: "Fat", value: macroData.fat?.amount || 0 },
  ];

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
              src={recipeData.image}
              alt={recipeData.title}
              height="300"
              width="320"
            />
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <NutritionChart nutritionData={chartData} />
            <Button
              onClick={handleGoBack}
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
          {strInstructions &&
            strInstructions.split(". ").map((instruction, index) => (
              <Grid container key={index} alignItems="flex-start">
                <Grid item xs={11}>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      // border: "1px solid yellow",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      backgroundColor: checkedItems[index] ? "grey" : "#FFCD29",
                      textDecoration: checkedItems[index]
                        ? "line-through"
                        : "none",
                      textDecorationColor: "red",
                    }}
                  >
                    {`${index + 1}. ${instruction}`}
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Checkbox
                    name={index.toString()}
                    onChange={handleCheckboxChange}
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
