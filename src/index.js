import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import BrandPage from "./components/pages/BrandsPage";
import ModelsPage from "./components/pages/ModelsPage";
import LoginForm from "./components/Authentication/LoginForm";
import Profile from "./components/Profile";


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
              <Route path="/login" Component={LoginForm} />
              <Route path="/brands" Component={BrandPage} />
              <Route path="/models" Component={ModelsPage} />
              <Route path="/profile" Component={Profile} />
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
