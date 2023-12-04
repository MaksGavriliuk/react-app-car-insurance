import React from 'react';
import Header from "../Header/Header";
import InsuranceCalculatorCard from "../InsuranceCalculatorCard/InsuranceCalculatorCard";
import GoogleMaps from "../GoogleMaps";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export default function StartPage() {

    return (
        <>
            <Header/>

            <InsuranceCalculatorCard/>

            <GoogleMaps />

            <ScrollToTopButton />

        </>
    )

}