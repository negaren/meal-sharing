import React, { useState, useEffect } from "react";
import MealReservationForm from "./MealReservationForm";
import { useParams } from "react-router-dom";

const MealReservationFunction = () => {
  let { id } = useParams();
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState("");
  const [reservationDetails, setReservationDetails] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: 0,
    created_date: new Date()
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-"),
    meal_id: 0,
    number_of_guests: 1,
  });
  
  const [availableMeals, setAvailableMeals] = useState([]);
  const [errorSpare, setErrorSpare] = useState("");

  const [reservationMessage, setReservationMessage] = useState(
    "Your desired meal is reserved sucessfuly"
  );

  async function fetchAvailableMeas() {
    return fetch(
      "api/meals?availableReservations=true"
    ).then(response => {return response.json()})
  }

  async function getAvailableMeals() {
    await fetchAvailableMeas()
      .then(data => {setAvailableMeals(data)})
      .catch((error) => setErrorSpare(error.message));
  }

  async function fetchUrl() {
    return fetch(`api/meals/${id}`).then((response) => {
      if (!response.ok) {
        throw Error("Could not find the meal");
      }
      return response.json();
    });
  }

  async function getData() {
    await fetchUrl()
      .then(data => {
        setFetchedData(data);
      })
      .catch((error) => setError(error));
  }

  useEffect(() => {
    getData();
    getAvailableMeals();
  },[]);


  function handleChangeName(event) {
    console.log(typeof event.target.value);
    if(typeof event.target.value == 'string') {
      setReservationDetails({
        ...reservationDetails,
        contact_name: event.target.value,
        meal_id: id,
      });
    }
    else {
      alert('Data entry is not valid')
    setReservationDetails({
      ...reservationDetails,
      contact_name: '',
      meal_id: id,
    });
    }
  }

  function handleChangeEmail(event) {
    setReservationDetails({
      ...reservationDetails,
      contact_email: event.target.value,
    });
  }

  function handleChangePhone(event) {
    setReservationDetails({
      ...reservationDetails,
      contact_phonenumber: event.target.value,
    });
  }

  function handleClick(e) {
    e.preventDefault();
    postData(reservationDetails);
    alert(reservationMessage);
  }

  const postData = (reservationDetails) => {
    fetch("api/reservations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reservationDetails),
    })
      .then((response) => {
        response.json();
        if (!response.ok) {
          throw Error("Something is went wrong");
        }
        setReservationMessage("Your desired meal is reserved sucessfuly");
      })
      .then((data) => {
        console.log(data);
        setReservationMessage("Your desired meal is reserved sucessfuly");
      })
      .catch((error) => {
        console.log(error);
        setReservationMessage(error.message);
      });
  };

  return (
    <>
      <MealReservationForm
        fetchedData={fetchedData}
        error={error}
        onChangeName={handleChangeName}
        onChangeEmail={handleChangeEmail}
        onChangePhone={handleChangePhone}
        onClick={handleClick}
        availableMeals={availableMeals}
        errorSpare={errorSpare}
        // reservationMessage={reservationMessage}
      />
    </>
  );
};

export default MealReservationFunction;
