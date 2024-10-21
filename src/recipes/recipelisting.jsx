import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { recipe_listing } from "../endpoints/http";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import CustomHeart from "../components/heart/customheart";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import { GlobalData } from "../navigation/stack";

const RecipeListing = () => {
  const [recipes, setRecipes] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [notification, setNotification] = useState(""); // For notification message

  const { favourites, addFavouriteHandler, removeFavouriteHandler } =
    useContext(GlobalData);

  const navigate = useNavigate(); // Hook for navigating to the favourites page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(recipe_listing);
        if (response.status === 200) {
          setRecipes(response.data.recipes);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFavoriteToggle = (recipe) => {
    const isFavorite = favourites.some((fav) => fav.id === recipe.id);

    if (isFavorite) {
      removeFavouriteHandler(recipe.id); // Remove from favourites if already a favourite
      setNotification(`${recipe.name} removed from favourites!`);
    } else {
      addFavouriteHandler(recipe); // Add to favourites if not a favourite
      setNotification(`${recipe.name} added to favourites!`);
    }

    setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
  };

  const gotoFavouritesHandler = () => {
    navigate("/favourites"); // Navigate to favourites page
  };

  // Handle loading and error states
  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // If the data is not an array, set a fallback
  if (!Array.isArray(recipes)) {
    return <p>No recipes found.</p>;
  }

  return (
    <div className="container">
      {notification && (
        <div className="alert alert-success">{notification}</div>
      )}
      <h1 className="text-center my-4">Recipe Listing</h1>
      <div className="row justify-content-center">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100" style={{ borderRadius: "12px" }}>
              {/* Image */}
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between">
                {/* Recipe Title */}
                <h5 className="card-title text-truncate">{recipe.name}</h5>

                {/* Align Button and Heart/Go to Favourites Button in One Line */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="btn btn-primary"
                    style={{ fontSize: "14px" }} // Compact button size
                  >
                    View Recipe
                  </Link>

                  {/* Conditionally render the heart icon or 'Go to Favourites' button */}
                  {favourites.some((fav) => fav.id === recipe.id) ? (
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: "14px" }}
                      onClick={gotoFavouritesHandler}
                    >
                      Go to Favourites
                    </button>
                  ) : (
                    <CustomHeart
                      isFavorite={false}
                      onFavoriteToggle={() => handleFavoriteToggle(recipe)} // Pass the recipe directly
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeListing;
