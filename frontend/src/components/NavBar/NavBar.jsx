import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import links from '../../data/links.json';
import { FaSkull } from 'react-icons/fa';
import './NavBar.css';

function NavBar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="nav-bar">
      <div className="nav-bar-elements">
        <div className="nav-logo">
          <div className="tooltip-container">
            <FaSkull className="nav-icon" data-tooltip="ARRR!" />
            <span className="tooltip">
              <span className="tooltip-text-a">A</span>
              <span className="tooltip-text-r-1">R</span>
              <span className="tooltip-text-r-2">R</span>
              <span className="tooltip-text-r-3">R</span>
              <span className="tooltip-text-exl">!</span>
            </span>
          </div>
        </div>

        <div className={`nav-toggle-nav ${navOpen ? 'open' : ''}`} onClick={() => setNavOpen(!navOpen)}></div>

        <div className={`nav-links ${navOpen ? 'open' : ''}`}>
          <ul>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
