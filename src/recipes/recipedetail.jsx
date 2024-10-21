import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipe_listing } from "../endpoints/http";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomHeart from "../components/heart/customheart"; // Import your CustomHeart component
import { GlobalData } from "../navigation/stack"; // Import the global context

const RecipeDetail = () => {
  const { recipeId } = useParams(); // Get the recipeId from the URL params
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state
  const { favourites, addFavouriteHandler, removeFavouriteHandler } =
    useContext(GlobalData); // Get favourites and handlers from context

  const navigate = useNavigate(); // Hook for navigating

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${recipe_listing}/${recipeId}`);
        if (response.status === 200) {
          setRecipeDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  const handleFavoriteToggle = () => {
    const isFavorite = favourites.some((fav) => fav.id === recipeId);

    if (isFavorite) {
      removeFavouriteHandler(recipeId); // Remove from favourites
    } else {
      addFavouriteHandler(recipeDetails); // Add to favourites
    }
  };

  const gotoFavouritesHandler = () => {
    navigate("/favourites"); // Navigate to favourites page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipeDetails.name) {
    return <div>No recipe details found.</div>;
  }

  const isFavorite = favourites.some((fav) => fav.id === recipeId); // Check if recipe is already a favourite

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm"
        style={{ borderRadius: "15px", overflow: "hidden" }}
      >
        {/* Card Image Section with CustomHeart Overlay */}
        <div className="position-relative">
          <img
            src={recipeDetails.image}
            className="img-fluid w-100"
            alt={recipeDetails.name}
            style={{ height: "300px", objectFit: "cover" }}
          />
          {/* CustomHeart or Button Positioned at the Top-Right Corner */}
          <div className="position-absolute top-0 end-0 p-3">
            {isFavorite ? (
              <button
                className="btn btn-secondary"
                style={{ fontSize: "14px" }}
                onClick={handleFavoriteToggle} // Click to remove from favourites
              >
                Remove from Favourites
              </button>
            ) : (
              <CustomHeart
                isFavorite={isFavorite} // Pass favorite state
                onClick={handleFavoriteToggle} // Click to add to favourites
              />
            )}
          </div>
        </div>

        {/* Recipe Details */}
        <div className="card-body">
          <h2 className="card-title fw-bold">{recipeDetails.name}</h2>
          <p className="text-muted">
            <strong>Cuisine: </strong> {recipeDetails.cuisine}
          </p>

          {/* Recipe Metadata */}
          <div className="d-flex justify-content-between mt-3 mb-4">
            <div>
              <p className="text-muted mb-1">
                <strong>Prep Time: </strong> {recipeDetails.prepTimeMinutes}{" "}
                mins
              </p>
              <p className="text-muted mb-1">
                <strong>Cook Time: </strong> {recipeDetails.cookTimeMinutes}{" "}
                mins
              </p>
              <p className="text-muted">
                <strong>Servings: </strong> {recipeDetails.servings}
              </p>
            </div>
            <div>
              <p className="text-muted mb-1">
                <strong>Difficulty: </strong> {recipeDetails.difficulty}
              </p>
              <p className="text-muted mb-1">
                <strong>Calories: </strong> {recipeDetails.caloriesPerServing}{" "}
                kcal
              </p>
              <p className="text-muted">
                <strong>Rating: </strong> {recipeDetails.rating} / 5 (
                {recipeDetails.reviewCount} reviews)
              </p>
            </div>
          </div>

          {/* Ingredients Section */}
          <h5>Ingredients</h5>
          <ul className="list-group list-group-flush mb-4">
            {recipeDetails.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ))}
          </ul>

          {/* Instructions Section */}
          <h5>Instructions</h5>
          <ol className="list-group list-group-numbered">
            {recipeDetails.instructions.map((instruction, index) => (
              <li key={index} className="list-group-item">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
