import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeListing from "../recipes/recipelisting";
import Favourites from "../favourites/favourites";
import RecipeDetail from "../recipes/recipedetail";
import Header from "../components/header";

export const GlobalData = createContext();

const Stack = () => {
  const [myFavourites, setMyFavourites] = useState([]);

  const addFavouriteHandler = (recipe) => {
    // Check if the recipe is already in the favourites
    if (!myFavourites.some((fav) => fav.id === recipe.id)) {
      setMyFavourites((prevFavourites) => [...prevFavourites, recipe]); // Add the new recipe
    }
  };

  const removeFavouriteHandler = (recipeId) => {
    setMyFavourites(
      (prevFavourites) => prevFavourites.filter((fav) => fav.id !== recipeId) // Remove the recipe by ID
    );
  };

  return (
    <GlobalData.Provider
      value={{
        favourites: myFavourites,
        addFavouriteHandler: addFavouriteHandler,
        removeFavouriteHandler: removeFavouriteHandler,
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RecipeListing />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="recipes/:recipeId" element={<RecipeDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalData.Provider>
  );
};

export default Stack;
