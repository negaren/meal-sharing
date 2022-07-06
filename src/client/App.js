import React from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import AddMeal from "./AddMeal";
import TestComponent from "./components/TestComponent/TestComponent";
import MainPage from "./MainPage";
import MealReservationFunction from "./MealReservationFunction"

export default function App() {

  return (
    <Router>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/share-meal" children={<AddMeal/>}>
      </Route>
      <Route path="/meals/:id" children={<MealReservationFunction />} >  
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>  
  );
}
// export default App;



