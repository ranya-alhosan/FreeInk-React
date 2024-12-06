import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Footer section */}
      <div className="footer_section layout_padding">
        <div className="container">
          {/* Footer logo */}
          <div className="footer_logo">
            <p>FreeInk</p>
          </div>
          {/* Footer menu */}
          <div className="footer_menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/blogPost">Blog</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          {/* Contact menu */}
          <div className="contact_menu">
            <ul>
              <li>
                <a href="#"><img src="/assets/images/call-icon.png" alt="Call Icon" /></a>
              </li>
              <li>
                <a href="tel:+011234567890">Call : +01 1234567890</a>
              </li>
              <li>
                <a href="#"><img src="/assets/images/mail-icon.png" alt="Mail Icon" /></a>
              </li>
              <li>
                <a href="mailto:demo@gmail.com">demo@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Footer;
