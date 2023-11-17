import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import BrandPage from "./components/pages/BrandsPage";
import ModelsPage from "./components/pages/ModelsPage";
import LoginForm from "./components/Authentication/LoginForm";
import Profile from "./components/Profile";



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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
