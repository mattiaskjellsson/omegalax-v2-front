import './app.css';
import React, { useState, useEffect } from 'react'
import { Login } from './components/login/login';
import CircleLoader from 'react-spinners/ClipLoader';
import { Landing } from './components/landing/landing';
import { login } from './actions/api';

export function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDisplayingLogin, setIsDisplayingLogin] = useState(false)
  const IS_LOGGED_IN = 'isLoggedIn';

  useEffect(() => {
    const isLoggedInString = localStorage.getItem(IS_LOGGED_IN) ?? 'false';
    const isLoggedIn = JSON.parse(isLoggedInString);
    console.log(isLoggedIn);
    setIsLoggedIn(isLoggedIn);
  }, [])

  const saveLoginState = (isLoggedIn) => {
    localStorage.setItem(IS_LOGGED_IN, JSON.stringify(isLoggedIn))
    setIsLoggedIn(isLoggedIn)
  }

  const handleLogin = (password) => {
    setIsLoading(true)
    login(password)
      .then((r) => {
        console.log(r)
        saveLoginState(r)
      })
      .catch((e) => {
        console.error(e)
        saveLoginState(false);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    isLoading
     ?(<div className='app-overlay-loading'>
      <CircleLoader color={'#ddd'} size={150} />
      </div>) 
     : isLoggedIn 
     ? <Landing />
      : <div>
      <Login close={() => setIsDisplayingLogin(false)} 
            onLogin={handleLogin}
            isLoading={isLoading}
      />
      </div>
  );

  
}
