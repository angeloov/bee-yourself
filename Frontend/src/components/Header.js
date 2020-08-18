import React from "react";
import Logo from "../BeeIcon.png";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" id="logo"/>
      <p id="pagetitle">Home</p>
      <p id="profilelink">Profile</p>
    </header>
  )
}