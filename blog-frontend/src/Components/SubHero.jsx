import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "/public/assets/css/about.css";

function SubHero ({ title, subtitle }){
return (
    <>
    
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content container">
          <div className="row align-items-center">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h1 className="banner-title animate-on-load"> {title} </h1>
              <p className="banner-subtitle animate-on-load">
               { subtitle } 
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
);
}
export default SubHero