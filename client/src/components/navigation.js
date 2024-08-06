
import React from 'react';
import "../pages/dashboard/dashboard.css"
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.setItem('emailUser', "");
    localStorage.setItem('typeUser', "");
    navigate("/");
  }

  return (
    <div className="menu">
      <ul className='menu-list'>
        <Link to="/"><li className='top'>Home</li></Link>
        <li>Profile</li>
        <li className="dropdown">
          Complaints
          <span className="dropdown-arrow">&#9660;</span>
          <ul className="dropdown-menu">
            <li>My Complaints</li>
            <Link to="/complaint"><li>New Complaint</li></Link>
          </ul>
        </li>
        <li>Settings</li>
        <li>Help</li>
        <li onClick={handleSignOut} className='bottom'>Sign Out</li>
      </ul>
    </div>
  );
};

export default Menu;