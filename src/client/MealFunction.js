import React, { useEffect, useState } from "react";
import MealContainer from "./MealContainer";
import "./MealContainer.css";

const MealFunction = () => {
  const [fetchedData, setFetchedData] = useState([]);

  async function fetchUrl() {
    const response = await fetch("http://localhost:3000/api/meals");
    return await response.json();
  }

  async function getData() {
    await fetchUrl().then((data) => {
      setFetchedData(data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <div className="meals-container">
        {console.log(fetchedData)}
        {fetchedData.map((items) => {
          return (
            <MealContainer
              key={items.id}
              title={items.title}
              description={items.description}
              maxReservation={items.max_reservations}
              price={items.price}
              id={items.id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default MealFunction;
