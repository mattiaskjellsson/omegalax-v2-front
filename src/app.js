import './app.css';
import React, { useState } from 'react'
import { Login } from './components/login/login';
import CircleLoader from 'react-spinners/ClipLoader';
import { Landing } from './components/landing/landing';
import { login } from './actions/api';

export function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDisplayingLogin, setIsDisplayingLogin] = useState(false)

  const handleLogin = (password) => {
    setIsLoading(true)
    login(password)
      .then((r) => {
        console.log(r)
        setIsLoggedIn(r)
      })
      .catch((e) => {
        console.error(e)
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
