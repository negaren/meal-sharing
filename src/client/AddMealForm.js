import React from "react";
import { Header } from "./Header";
import './AddMeal.css'

const AddMealForm = ({
  titleValue,
  descValue,
  dateValue,
  locationValue,
  onClick,
  titleOnChange,
  descOnChange,
  locationOnChange,
  dateOnChange,
  maxReservationOnChange,
  priceOnChange,
  message
}) => {

    if (message.length !==0) {
        return(
            <>
            <Header />
            <p>{message}</p>
            </>
        )
    } else {
        return (
            <>
              <Header />
              <form className="add-meal">
                <div>
                  <h3>Share your meal with others</h3>
                </div>
                <div>
                  <label htmlFor="title">Meal title </label>
                </div>
                <div>
                <input
                    type={"text"}
                    value={titleValue}
                    onChange={titleOnChange}
                    id="title"
                  ></input>
                </div>
                <div>
                  <label htmlFor="description">Description </label>
                </div>
                <div>
                <textarea
                    value={descValue}
                    onChange={descOnChange}
                    id="description"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="location">Location </label>
                </div>
                <div>
                <input
                    type={"text"}
                    value={locationValue}
                    onChange={locationOnChange}
                    id="locatio"
                  ></input>
                </div>
                <div>
                  <label htmlFor="date">Date </label>
                </div>
                <div>
                <input
                    type={"date"}
                    value={dateValue}
                    onChange={dateOnChange}
                    id="date"
                  ></input>
                </div>
                <div>
                  <label htmlFor="seats">Maximum reservations </label>
                </div>
                <div>
                <input
                    type={"number"}
                    onChange={maxReservationOnChange}
                    id="seats"
                  ></input>
                </div>
                <div>
                  <label htmlFor="price">Price </label>
                </div>
                <div>
                <input type={"number"} onChange={priceOnChange} id="price"></input>
                </div>
                <button onClick={onClick}>Add meal</button>
              </form>
            </>
          );
    }
  
};

export default AddMealForm;
