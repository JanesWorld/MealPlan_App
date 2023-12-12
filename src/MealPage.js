import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MealPage = ({ selectedCategory }) => {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [checked, setChecked] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!id) return;
  //   const fetchRecipeData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  //       );
  //       setRecipeData(response.data.meals[0]);
  //     } catch (error) {
  //       console.log(
  //         "Error fetching detailed Recipes",
  //         error.message,
  //         error.response
  //       );
  //     }
  //   };
  //   fetchRecipeData();
  // }, [recipeData, id]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        if (!id) return;
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const fetchedRecipeData = response.data.meals[0];
        setRecipeData(fetchedRecipeData);

        // Initialize 'checked' state based on the number of instructions
        const instructionCount =
          fetchedRecipeData.strInstructions.split(". ").length;
        setChecked(new Array(instructionCount).fill(false));
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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCheck = (index) => {
    // Toggle the checked state of the instruction at the given index
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

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

  const handlePageChange = (direction) => {
    const newPage = direction === "back" ? page - 1 : page + 1;
    setPage(newPage);
  };

  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;
  const displayedInstructions = strInstructions
    .split(". ")
    .slice(startIndex, endIndex);

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
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              display: "flex",
              fontWeight: "bold",
              margin: 0,
              padding: 0,
            }}
          >
            {strMeal}
          </h2>
          <h3 style={{ fontWeight: "lighter", margin: 0, paddingTop: "5px" }}>
            #{selectedCategory}
          </h3>
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
              onClick={handleGoBack}
              sx={{
                color: "white",
                backgroundColor: "#264653",
                ":hover": {
                  backgroundColor: "#E9C46A",
                  color: "black",
                },
              }}
            >
              Choose another meal instead
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "row",
          marginBottom: "40px",
        }}
      >
        <Grid item xs={5}>
          <h3>Ingredients:</h3>
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
          <Container sx={{ border: "2px solid black", borderRadius: "10px" }}>
            <h3>Instructions:</h3>
            {displayedInstructions.map((instruction, index) => (
              <Grid container key={index} alignItems="flex-start">
                <Grid item xs={11}>
                  <Box
                    sx={{
                      borderRadius: "10px",
                      border: checked[startIndex + index]
                        ? "1px solid grey"
                        : "1px solid #E76F51",
                      padding: "10px",
                      marginBottom: "10px",
                      backgroundColor: checked[startIndex + index]
                        ? "grey"
                        : "#E76F51",
                      display: "flex",
                      textDecoration: checked[index] && "line-through",
                    }}
                    onClick={() => handleCheck(startIndex + index)}
                  >
                    {`${startIndex + index + 1}. ${instruction}`}
                  </Box>
                </Grid>
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button
                onClick={() => handlePageChange("back")}
                disabled={page === 1}
              >
                <ArrowBackIcon />
              </Button>

              <Button
                onClick={() => handlePageChange("forward")}
                disabled={endIndex >= strInstructions.split(". ").length}
              >
                <ArrowForwardIcon />
              </Button>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealPage;
