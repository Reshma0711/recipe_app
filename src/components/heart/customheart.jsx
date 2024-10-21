import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const CustomHeart = ({ onFavoriteToggle, isFavorite }) => {
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
 
  const toggleFavorite = () => {
    const newFavoriteStatus = !localFavorite;
    setLocalFavorite(newFavoriteStatus);
    onFavoriteToggle(newFavoriteStatus);
  };



  // Update local state when the prop changes
  useEffect(() => {
    setLocalFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <span
      onClick={toggleFavorite}
      style={{
        cursor: "pointer",
        fontSize: "32px",
        color: localFavorite ? "red" : "gray",
        transition: "transform 0.3s ease, color 0.3s ease",
        transform: localFavorite ? "scale(1.4)" : "scale(1)",
        animation: localFavorite ? "bounce 0.5s" : "none",
      }}
    >
      <FaHeart />
    </span>
  );
};

export default CustomHeart;
