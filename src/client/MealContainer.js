import React from "react";
import "./MealContainer.css";

const MealContainer = ({ title, description, maxReservation, price, id }) => {
  return (
    <a href={`http://localhost:3000/meals/${id}`} target="_blank" className="meal-links"><div className="meal-container">
        <p className="title">{title}</p>
        <p>{description}</p>
        <p>
          <span className="title">Maximum reservations:</span> {maxReservation}
        </p>
        <p>
          <span className="title">Price:</span> {price}
        </p>
        </div></a>
  );
};

export default MealContainer;
