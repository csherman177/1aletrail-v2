import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import '../../styles/Header.css';
import Logo from '../../assets/brewfly-200.svg';

export default function Header () {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="text-center">
            <img src={ Logo } alt="logo" className="logo"></img>
        </div>
        <div className="navbar justify-content-center">
            <Link className="nav-item m-2" to="/">
                Home
            </Link>
            <Link className="nav-item m-2" to="/breweries">
                Breweries
            </Link>
            <Link className="nav-item m-2" to="/aboutus">
                About Us
            </Link>
            <Link className="nav-item m-2" to="/contact">
                Contact
            </Link>
            {Auth.loggedIn() ? (
                <>
                <Link className="nav-item m-2" to="/me">
                    Profile
                </Link>
                <button className="nav-item m-2" onClick={logout}>
                    Logout
                </button>
            </>
            ) : (
            <>
                <Link className="nav-item m-2" to="/login">
                    Login
                </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
