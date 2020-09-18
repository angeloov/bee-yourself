import React, { useState, useEffect } from 'react';
import Logo from './assets/BeeIcon.png';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    (async () => {
      const user = await axios({
        method: 'GET',
        withCredentials: true,
        url: 'http://localhost:5000/user',
      });
      setUserData(user.data);
    })();
  });

  return (
    <header>
      <Link to='/home' id='home-link' onClick={() => setCurrentPage('Home')}>
        <img src={Logo} alt='Logo' id='logo' />
      </Link>
      <p id='pagetitle'>{currentPage}</p>
      {currentPage === 'Home' ? (
        <h1 className='beeyou-title'>Hello, {userData.username}</h1>
      ) : null}
      <Link to='/profile' id='profile-link' onClick={() => setCurrentPage('Profile')}>
        <p id='text'>Profile</p>
      </Link>
    </header>
  );
}
