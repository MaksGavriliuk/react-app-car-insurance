import React from 'react';
import ReactDOM from 'react-dom/client';
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
  </React.StrictMode>
);


reportWebVitals();
