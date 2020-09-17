import React, { useState } from 'react';
import Logo from './assets/BeeIcon.png';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('Home');

  const getUserFromServer = () => {
    fetch('http://localhost:5000/user/me')
      .then(r => r.json())
      .then(res => console.log(res));
  };

  return (
    <header>
      <button onClick={getUserFromServer}>Get user</button>
      <Link to='/home' id='home-link' onClick={() => setCurrentPage('Home')}>
        <img src={Logo} alt='Logo' id='logo' />
      </Link>
      <p id='pagetitle'>{currentPage}</p>
      {currentPage === 'Home' ? <h1 className='beeyou-title'>BeeYou</h1> : null}
      <Link to='/profile' id='profile-link' onClick={() => setCurrentPage('Profile')}>
        <p id='text'>Profile</p>
      </Link>
    </header>
  );
}
