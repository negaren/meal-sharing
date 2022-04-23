import React from "react";
import { Header } from "./Header";
import Navbar from "./Navbar";
import MealFunction from "./MealFunction";
import "./MainPage.css"
import Footer from "./Footer";

const MainPage = () => {
    return (
        <>
        <Header/>
        <Navbar/>
        <div>
        <img className="mp-bgp " src="https://i.ibb.co/NSKWZLd/oatmeal-dryfruits-with-bird-paradise-flower-white-background.jpg" alt="oatmeal-dryfruits-with-bird-paradise-flower-white-background" border="0" />
        </div>
        <MealFunction/>
        <Footer/>
        </>
    )
}

export default MainPage