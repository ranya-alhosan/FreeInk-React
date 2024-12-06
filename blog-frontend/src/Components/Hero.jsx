  import React from 'react';
  import { Carousel, Button } from 'react-bootstrap';
  import { Link } from 'react-router-dom';

  function Hero() {
    return (
      <div className="container-fluid">
        <div className="banner_section layout_padding">
          <h5 className="banner_taital">Fly high with your words, powered by FreeInk.</h5>
          <Carousel>
            <Carousel.Item>
              <div className="image_main">
                <div className="container">
                  <img src="/assets/images/test3.jpg" className="image_1" alt="First slide" />
                  {/* Buttons Section */}
                  <div className="buttons_container">
              <Button variant="primary" className="custom_button">
                <Link to="/signup" className="button_link">Singup</Link>
              </Button>
              <Button variant="secondary" className="custom_button">
                <Link to="/contact" className="button_link">Contact US </Link>
              </Button>
            </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="image_main">
                <div className="container">
                  <img src="/assets/images/test1.jpg" className="image_1" alt="Second slide" />
                </div>
              </div>
            </Carousel.Item>
        
          </Carousel>

          
        </div>
      </div>
    );
  }

  export default Hero;
