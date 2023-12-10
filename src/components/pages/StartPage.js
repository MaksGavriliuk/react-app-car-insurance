import React from 'react';
import UserHeader from "../Header/UserHeader";
import InsuranceCalculatorCard from "../InsuranceCalculatorCard/InsuranceCalculatorCard";
import GoogleMaps from "../GoogleMaps";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function StartPage() {

    return (
        <>
            <Header/>
            <InsuranceCalculatorCard/>
            <GoogleMaps/>
            <ScrollToTopButton/>
            <Footer/>
        </>
    )

}