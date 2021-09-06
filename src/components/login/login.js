import React, { useEffect, useState }from 'react';
import './login.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export function Login({close, onLogin, isLoading}) {
  const [type, setType] = useState('password')
  const [password, setPassword] = useState('');
  

  useEffect(() => {
    return () => {}
  // eslint-disable-next-line
  }, [])

  const submit = async () => {
    onLogin(password);
  }

  const handleOnChange = (event) => {
    setPassword(event.target.value);
  };
  

  const handleClick = () => {
    setType(type === 'text' ? 'password' : 'text');
  };

  return (
    <div className='overlay' onClick={close}>
        <div className='overlay-content' onClick={()=>{}}>
            <div className='overlay-header'>
              <span>Login</span>
            </div>
            <div className="login-form">
              <div>
                <label className="password">
                  <input type={type} placeholder="Enter password" className="password-input" onChange={handleOnChange}/>
                  <span className="password-type" onClick={handleClick}>
                    {
                      type === 'text' ? 
                      <AiOutlineEyeInvisible />
                      : <AiOutlineEye />
                    }
                  </span>
                </label>
              </div>
              <div className="login-button-container">
                <button onClick={submit} disabled={isLoading}>Login</button>
              </div>
            </div>
        </div>
    </div> 
  )
}