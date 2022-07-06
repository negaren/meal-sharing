import React from "react";
import { Header } from "./Header";
import { useParams } from "react-router-dom";


const AvailableReservations = () => {

    async function fetchUrl() {
        return fetch(`api/meals/?availablereservations=true`).then((response) => {
          if (!response.ok) {
            throw Error("Could not find the meal");
          }
          return response.json();
        });
      }
  
      async function getData() {
        await fetchUrl().then((data) => {
          setFetchedData(data)
        }).catch((error) => setError(error.message));
      }
  
      useEffect(() => {
        getData();
      }, []);

    getData('?availablereservations=true')
    console.log(getData('?availablereservations=true'));
    return (
        <Header/>
    )
}

