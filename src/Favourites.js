import React, { useState } from "react";
import { useFavourites } from "./Context/FavouritesContext";
import RecipeCard from "./RecipeCard"; // make sure to import RecipeCard

const Favourites = () => {
  const { favourites } = useFavourites();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredFavourites = favourites.filter((recipe) => {
    return (
      selectedCategory === "all" || recipe.strCategory === selectedCategory
    );
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Favourites</h1>
      </div>
      <div>
        {/* Filter Dropdown */}
        <div style={{ textAlign: "center", margin: "1rem" }}>
          <label htmlFor="filter">Filter by Meal Type:</label>
          <select
            id="filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="Lamb">Lamb</option>
            <option value="Vegan">Vegan</option>
            <option value="Chicken">Chicken</option>
            {/* Add more options based on your data */}
          </select>
        </div>

        {/* Recipes Grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
            minHeight: "80vh",
          }}
        >
          {filteredFavourites.length > 0 ? (
            filteredFavourites.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p>No favourites to show based on filter.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourites;
