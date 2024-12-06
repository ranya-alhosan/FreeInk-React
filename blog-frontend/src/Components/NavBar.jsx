import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the token is present in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update the state based on token presence
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update the state to reflect that the user is logged out
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="header_section">
      <div className="container-fluid header_main">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="logo" href="/">FreeInk</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blogPost">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              {/* Conditionally render Login or Logout link */}
              <li className="nav-item">
                {isLoggedIn ? (
                  <span className="nav-link" onClick={handleLogout}>Logout</span>
                ) : (
                  <Link className="nav-link" to="/login">Login</Link>
                )}
              </li>
              {/* Conditionally render profile link */}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <img
                      src="public/assets/images/user.png"
                      alt="Profile"
                      width={30}
                      style={{ borderRadius: '50%' }}
                    />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
