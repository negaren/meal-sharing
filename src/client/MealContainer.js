import React from "react";
import "./MealContainer.css";

const MealContainer = ({ title, description, maxReservation, price }) => {
  return (
    <div className="meal-container">
        <p className="title">{title}</p>
        <p>{description}</p>
        <p>
          <span className="title">Maximum reservations:</span> {maxReservation}
        </p>
        <p>
          <span className="title">Price:</span> {price}
        </p>
    </div>
  );
};

export default MealContainer;
