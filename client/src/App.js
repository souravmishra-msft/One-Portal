
import { useAccount, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Favorites from './components/Favorites';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { loginRequest } from './AuthConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';



function App() {

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();


  useEffect(() => {
    if (!isAuthenticated) {
      instance.ssoSilent({
        scopes: loginRequest.scopes
      }).then((response) => {
        console.log(response);

        instance.setActiveAccount(response.account);
      }).catch(err => {
        if (err instanceof InteractionRequiredAuthError) {
          instance.loginRedirect(loginRequest)
            .catch(err => console.error(err));
        }
      });
    }
  }, []);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
