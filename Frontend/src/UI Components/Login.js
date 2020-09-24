import React, { useState } from 'react';
import './Login.css';
import BeeIcon from '../components/assets/BeeIcon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:5000/login',
      data: { username: username, password: password },
    }).then(res => {
      if (res.data.success) window.location.href = 'http://localhost:3000/home';
      else console.log('The login was not successful');
    });
  };

  const handleUserinput = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-title'>
        <img src={BeeIcon} alt='BeeYou Logo' className='by-logo' id='l' />
        <h1 id='tt-l'>Login</h1>
      </div>
      <form id='login-form' autoComplete='off' onSubmit={handleLogin}>
        <input
          type='text'
          className='text-input'
          name='username'
          id='u-field'
          placeholder='Username'
          value={username}
          onChange={handleUserinput}
        />
        <input
          type='password'
          name='password'
          className='text-input'
          id='p-field'
          placeholder='Password'
          value={password}
          onChange={handleUserinput}
        />
        <p className='registrati'>Don't have an account? <Link to="/register">Register</Link></p>
        <div id='btn-container'>
          <button className='btn'>Login</button>
        </div>
      </form>
    </div>
  );
}
