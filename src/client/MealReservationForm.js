import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import "./MealReservationForm.css";

const MealReservationForm = ({
  fetchedData,
  error,
  nameValue,
  phoneValue,
  emailValue,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onClick,
  mealId,
  availableMeals,
  errorSpare,
  // reservationMessage
}) => {
  const [availableMealMessage, setAvailableMealMessage] = useState(
    "Your desired meal has no available seat"
  );

  useEffect(() => {
    if (availableMeals.length !== 0) {
      for (const element of availableMeals) {
        if (element.id == mealId) {
          setAvailableMealMessage("Your desired meal is reserved sucessfuly");
          break;
        }
      }
    }
  }, [availableMeals]);

  if (fetchedData.length !== 0) {
    mealId = fetchedData[0].id;

    if (availableMealMessage == "Your desired meal has no available seat") {
      return (
        <>
          <Header />
          <h3>{availableMealMessage}</h3>
        </>
      );
    } else {
      return (
        <>
          <form className="meal-form">
            <Header />
            <div>
              <h2 className="meal-title">{fetchedData[0].title}</h2>
              <p className="meal-desc">{fetchedData[0].description}</p>
              <p className="meal-desc">Price: {fetchedData[0].price}</p>
            </div>
            <div className="meal-form">
              <div>
                <label>Name: </label>
                <input
                  type={"text"}
                  value={nameValue}
                  onChange={onChangeName}
                ></input>
              </div>
              <div>
                <label>Phone number: </label>
                <input
                  type={"number"}
                  value={phoneValue}
                  onChange={onChangePhone}
                ></input>
              </div>
              <div>
                <label>Email: </label>
                <input
                  type={"email"}
                  value={emailValue}
                  onChange={onChangeEmail}
                ></input>
              </div>
              <div>
                <button onClick={onClick}>reserve the meal</button>
              </div>
            </div>
          </form>
        </>
      );
    }
  } else if (fetchedData.length == 0) {
    return (
      <>
        <Header />
        <form>
          <h3>The meal does not exist</h3>
        </form>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <form>
          <h3>{error}</h3>
        </form>
      </>
    );
  }
};

export default MealReservationForm;
