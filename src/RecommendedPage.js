import { Container } from "@mui/system";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";
import "./RecommendedPage.css";

const RecommendedPage = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appID = "3c552c56";
  const appKey = "43d60ed61fccd8d04608bc7e66814e90";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );

        console.log(response.data.hits);
        setRecipes(response.data.meals);
      } catch (error) {
        console.log("Error fetching recipes", error.message, error.response);
      }
    };
    fetchRecipes();
  }, [selectedCategory]);

  console.log("Category", selectedCategory);
  return (
    <Container>
      <h2 style={{ paddingLeft: "25px" }}>
        Recommended
        <span style={{ color: "#E76F51" }}> {selectedCategory}</span> Recipes
        for you{" "}
      </h2>
      <Container>
        <div className="recipe-container">
          {recipes &&
            recipes.slice(0, 6).map((recipe) => (
              <div key={recipe.idMeal} className="recipe-card">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
        </div>
        <div>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              width: "30%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Next Page
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default RecommendedPage;
