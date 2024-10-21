import React, { useContext } from "react";
import { GlobalData } from "../navigation/stack";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CustomHeart from "../components/heart/customheart"; // Import CustomHeart
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Favourites = () => {
  const { favourites, removeFavouriteHandler } = useContext(GlobalData);

  // Function to handle the toggle of favourites
  const handleFavoriteToggle = (isFavorite, recipe) => {
    if (!isFavorite) {
      removeFavouriteHandler(recipe.id); // Remove from favourites if it is not a favourite
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Favourites</h1>
      {favourites.length > 0 ? (
        <div className="container">
          <div className="row">
            {favourites.map((each) => (
              <div key={each.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100">
                  <img
                    src={each.image} // Assuming each recipe has an image property
                    className="card-img-top"
                    alt={each.name}
                    style={{ objectFit: "cover", height: "200px" }} // Adjust height as needed
                  />
                  <div className="card-body">
                    <h5 className="card-title">{each.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/recipes/${each.id}`} // Link to the recipe detail page
                        className="btn btn-info"
                      >
                        View Recipe
                      </Link>
                      <CustomHeart
                        onFavoriteToggle={(isFavorite) =>
                          handleFavoriteToggle(isFavorite, each)
                        }
                        isFavorite={true} // Always true since it's in favourites
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h3 className="text-center">No favourites</h3>
      )}
    </>
  );
};

export default Favourites;
