import React, { createContext, useState, useContext } from "react";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (recipe) => {
    setFavourites((prevFavourites) => [...prevFavourites, recipe]);
  };

  const removeFromFavourites = (recipeId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((favRecipe) => favRecipe.idMeal !== recipeId)
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};
