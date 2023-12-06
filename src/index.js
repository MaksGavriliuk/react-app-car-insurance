import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import BrandPage from "./components/pages/BrandsPage";
import ModelsPage from "./components/pages/ModelsPage";
import LoginForm from "./components/Authentication/LoginForm";
import Profile from "./components/pages/Profiles/Profile";
import InsuranceCalculation from "./components/pages/InsuranceCalculation";
import NotApprovedContracts from "./components/Contracts/NotApprovedContracts";
import ApprovedContracts from "./components/Contracts/ApprovedContracts";
import LogoutForm from "./components/Authentication/LogoutForm";
import AddCar from "./components/Car/AddCar";
import StartPage from "./components/pages/StartPage";
import OSGOVTS from "./components/pages/InsuranceArticles/OSGOVTS";
import Casko from "./components/pages/InsuranceArticles/Casko";
import GreenCard from "./components/pages/InsuranceArticles/GreenCard";
import RegistrationForm from "./components/Authentication/RegistrationForm";
import AddFeedbackPage from "./components/pages/AddFeeadbackPage";
import EngineVolumesPage from "./components/pages/EngineVolumesPage";
import FuelTypesPage from "./components/pages/FuelTypesPage";


// axios.defaults.baseURL = 'http://localhost:8080'; // Установите базовый URL вашего сервера
// axios.defaults.withCredentials = true; // Разрешает отправку куки и авторизационных данных
//
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" Component={StartPage} />
              <Route path="/login" Component={LoginForm} />
              <Route path="/logout" Component={LogoutForm} />
              <Route path="/register" Component={RegistrationForm} />
              <Route path="/brands" Component={BrandPage} />
              <Route path="/models" Component={ModelsPage} />
              <Route path="/engine-volumes" Component={EngineVolumesPage} />
              <Route path="/fuel-types" Component={FuelTypesPage} />
              <Route path="/contracts" Component={ModelsPage} />
              <Route path="/contracts/not-approved" Component={NotApprovedContracts} />
              <Route path="/contracts/approved" Component={ApprovedContracts} />
              <Route path="/profile" Component={Profile} />
              <Route path="/calculate" Component={InsuranceCalculation} />

              <Route path="/add-car" Component={AddCar} />

              <Route path='/osgovts' Component={OSGOVTS} />
              <Route path='/casko' Component={Casko} />
              <Route path='/green-card' Component={GreenCard} />


              <Route path='/add-feedback' Component={AddFeedbackPage} />


          </Routes>
      </BrowserRouter>
    {/*<App />*/}
  </React.StrictMode>
);


// const token = localStorage.getItem('jwtToken');
//
// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
