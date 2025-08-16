import React, { useEffect, useState, useContext } from "react";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { User } from "./User";
import { nav } from "../../assets/data/data";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Context } from "../../context/Context";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        header.classList.toggle("active", window.scrollY > 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="scontainer flex space-between">
        
        {/* Logo + Title */}
        <div className="logo-title">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="logo" width="80px" />
          </Link>
          <h1 className="project-title">ArdhNaariShakti Taara</h1>
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Menu for Desktop */}
        <nav className="nav-menu desktop-nav">
          <ul>
            {nav.map((link) => (
              <li key={link.id}>
                {link.text === "taarabot" ? (
                  <a
                    href={link.url}
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {link.text}
                  </a>
                ) : (
                  <NavLink
                    to={link.url}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={closeMenu}
                  >
                    {link.text}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Account */}
        <div className="account flexCenter desktop-account">
          <User />
        </div>

        {/* Mobile Drop-down Menu */}
        {menuOpen && (
          <div className="openProfile mobile-dropdown">
            {/* Nav Links */}
            {nav.map((link) => (
              link.text === "taarabot" ? (
                <a
                  key={link.id}
                  href={link.url}
                  className="box"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}
                >
                  {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
                </a>
              ) : (
                <NavLink
                  key={link.id}
                  to={link.url}
                  className={({ isActive }) =>
                    isActive ? "box active" : "box"
                  }
                  onClick={closeMenu}
                  style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}
                >
                  {link.text.charAt(0).toUpperCase() + link.text.slice(1)}
                </NavLink>
              )
            ))}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #eee' }} />
            {/* User Actions */}
            {!user ? (
              <Link to="/login" className="box my-account" onClick={closeMenu} style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>
                My Account
              </Link>
            ) : (
              <>
                <Link to="/account" className="box" onClick={closeMenu} style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>
                  My Profile
                </Link>
                <Link to="/create" className="box" onClick={closeMenu} style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>
                  Create Post
                </Link>
                <button className="box" onClick={handleLogout} style={{ color: '#222', fontWeight: 500 }}>
                  Log Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
