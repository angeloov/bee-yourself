import React, { useState } from 'react';
import './Login.css';
import BeeIcon from '../components/assets/BeeIcon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordIsTyped, setPasswordIsTyped] = useState(false);

  if (passwordIsTyped) {
    if (password1 === password2 && password1.length !== 0) {
      lightUpCheck('#check1', '#2ecc71');
      lightUpCheck('#check2', '#2ecc71');
    } else {
      lightUpCheck('#check1', '#e74c3c');
      lightUpCheck('#check2', '#e74c3c');
    }
  }

  function showChecks() {
    let el1 = document.querySelector('#check1');
    let el2 = document.querySelector('#check2');

    el1.style.display = 'block';
    el2.style.display = 'block';
  }

  function lightUpCheck(id, color) {
    let elm = document.querySelector(id);
    elm.style.fill = color;
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (password1 === password2) {
      axios({
        method: 'POST',
        withCredentials: true,
        url: 'http://localhost:5000/register',
        data: { username: username, password: password1 },
      }).then(res => {
        console.log(res.data);
        if (res.data.success) window.location.href = 'http://localhost:3000/';
        else console.log('Server error');
      });
    } else {
      console.log('Passwords do not match!');
    }
  };

  const handleUserinput = e => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password1') {
      setPassword1(e.target.value);
    } else {
      setPassword2(e.target.value);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-title'>
        <img src={BeeIcon} alt='BeeYou Logo' className='by-logo' id='l' />
        <h1 id='tt-l'>Register</h1>
      </div>
      <form id='login-form' autoComplete='off' onSubmit={handleSubmit}>
        <input
          type='text'
          className='text-input'
          name='username'
          id='u-field'
          placeholder='Username'
          value={username}
          onChange={handleUserinput}
        />
        <div className='input-container'>
          <input
            type='password'
            name='password1'
            className='text-input'
            id='p-field'
            placeholder='Password'
            value={password1}
            onChange={handleUserinput}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='input-check'
            id='check1'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
          </svg>
        </div>

        <div className='input-container'>
          <input
            type='password'
            name='password2'
            className='text-input'
            id='p-field'
            placeholder='Confirm password'
            value={password2}
            onChange={handleUserinput}
            onFocus={() => {
              setPasswordIsTyped(true);
              lightUpCheck('#check1', '#e74c3c');
              lightUpCheck('#check2', '#e74c3c');
              showChecks();
            }}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='input-check'
            id='check2'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
          </svg>
        </div>
        <p className='registrati'>
          Hai già un account? <Link to='/'>Accedi</Link>
        </p>
        <div id='btn-container'>
          <button className='btn'>Register</button>
        </div>
      </form>
    </div>
  );
}
