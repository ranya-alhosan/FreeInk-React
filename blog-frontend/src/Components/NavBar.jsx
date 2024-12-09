import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2 for confirmation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Check if the token is present in localStorage and load the username
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName'); // Get the user name from localStorage
    setIsLoggedIn(!!token); // Update the state based on token presence
    setUserName(storedUserName || ''); // Set the user name if available

    // Check if it's the first login by looking in localStorage for a "hasShownWelcome" flag
    if (token && !localStorage.getItem('hasShownWelcome')) {
      // Show the toast only if it's the first login
      Swal.fire({
        title: `Welcome, ${storedUserName || 'User'}`, // Display the user's name
        icon: 'success',
        toast: true, // Enable toast style
        position: 'top-end', // Position the toast at the top right
        showConfirmButton: false, // Hide the confirm button
        timer: 3000, // Toast will disappear after 3 seconds
        timerProgressBar: true, // Show a progress bar
      });

      // Set a flag in localStorage to indicate the welcome message has been shown
      localStorage.setItem('hasShownWelcome', 'true');
    }
  }, [isLoggedIn]);

  // Handle logout functionality with SweetAlert2 confirmation
  const handleLogout = () => {
    // Show a SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the logout logic here
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('userName'); // Remove user name from localStorage
        setIsLoggedIn(false); // Update the state to reflect that the user is logged out
        setUserName(''); // Clear the user name
        localStorage.removeItem('hasShownWelcome'); // Remove the flag so the message can show again if needed
        navigate('/login'); // Redirect to login page
      }
    });
  };

  return (
    <div className="header_section">
      <div className="container-fluid header_main">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="logo" to="/">FreeInk</Link>
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
              {/* Home or Blog */}
              <li className="nav-item me-3">
                <Link className="nav-link" to={isLoggedIn ? "/blogPost" : "/"}>{isLoggedIn ? "Blog" : "Home"}</Link>
              </li>
              
              {/* About */}
              <li className="nav-item me-3">
                <Link className="nav-link" to="/about">About</Link>
              </li>

              {/* Contact */}
              <li className="nav-item  me-3">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>

              {/* Login/Logout */}
              <li className="nav-item  me-3">
                {isLoggedIn ? (
                  <span
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </span>
                ) : (
                  <Link className="nav-link" to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </Link>
                )}
              </li>

              {/* Profile */}
              {isLoggedIn && (
                <li className="nav-item  me-3">
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
