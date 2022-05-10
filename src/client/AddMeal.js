import React, { useState } from "react";
import AddMealForm from "./AddMealForm";

const AddMeal = () => {
  const regex = /^[a-zA-Z \,\(\)]+$/;
  const time = new Date().toLocaleTimeString();
  const [mealData, setmealData] = useState({
    title: "",
    description: "",
    location: "",
    when: new Date().toLocaleDateString().split("/").reverse().join("-"),
    max_reservations: 0,
    created_date:
      new Date().toLocaleDateString().split("/").reverse().join("-") +
      " " +
      time,
    price: 0,
  });
  const [message, setMessage] = useState("");

  const postData = (mealData) => {
    fetch("api/meals", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mealData),
    })
      .then((response) => {
        response.json();
        if (!response.ok) {
          throw Error("Something is went wrong");
        }
        setMessage("Your meal is ready to be shared");
      })
      .then((data) => {
        console.log(data);
        setMessage("Your meal is ready to be shared");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };

  function titleHandler(event) {
    setmealData({ ...mealData, title: event.target.value });
    console.log();
  }

  function descHandler(event) {
    setmealData({ ...mealData, description: event.target.value });
  }

  function locationHandler(event) {
    setmealData({ ...mealData, location: event.target.value });
  }

  function dateHandler(event) {
    setmealData({ ...mealData, when: event.target.value });
  }

  function maxReservationHandler(event) {
    setmealData({ ...mealData, max_reservations: event.target.value });
  }

  function priceHandler(event) {
    setmealData({ ...mealData, price: event.target.value });
  }

  function clickHandler() {
    if (
      mealData.title.length !== 0 &&
      mealData.description.length !== 0 &&
      mealData.location.length !== 0 &&
      mealData.when >
        new Date().toLocaleDateString().split("/").reverse().join("-") &&
      mealData.max_reservations !== 0 &&
      mealData.price !== 0
    ) {
      if (
        regex.test(mealData.title.toLocaleLowerCase()) &&
        regex.test(mealData.description.toLocaleLowerCase()) &&
        regex.test(mealData.location.toLocaleLowerCase()) 
      ) {
        setMessage("Your meal is ready to be shared");
        postData(mealData);
        allert(message)
      }
      else{ 
          console.log( regex.test(mealData.title.toLocaleLowerCase()));
      alert("Please insert valid data");}
    }
    else {
    console.log(mealData.description);}
  }



  return (
    <>
      <AddMealForm
        titleOnChange={titleHandler}
        descOnChange={descHandler}
        locationOnChange={locationHandler}
        dateOnChange={dateHandler}
        onClick={clickHandler}
        maxReservationOnChange={maxReservationHandler}
        priceOnChange={priceHandler}
        message={message}
      />
      {/* const AddMealForm = ({titleValue, descValue, dateValue, locationValue, titleOnChange, descOnChange, locationOnChange, dateOnChange}) => { */}
    </>
  );
};

export default AddMeal;
