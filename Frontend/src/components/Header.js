import React, { useState } from 'react';
import Logo from '../assets/BeeIcon.png';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [currentPage, setCurrentPage] = useState('Home');
  return (
    <header>
      <Link to='/' id="home-link" onClick={() => setCurrentPage('Home')}>
        <img src={Logo} alt='Logo' id='logo' />
      </Link>
        <p id='pagetitle'>{currentPage}</p>
      {currentPage === "Home" ? <h1 className="beeyou-title">BeeYou</h1> : null}
      <Link to='/profile' id='profile-link' onClick={() => setCurrentPage('Profile')}>
        <p id='text'>
          Profile
        </p>
      </Link>
    </header>
  );
}
