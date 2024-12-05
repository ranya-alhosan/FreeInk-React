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
                <img src="/assets/images/image.png" className="image_1" alt="First slide" />
               
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
          <Carousel.Item>
            <div className="image_main">
              <div className="container">
                <img src="/assets/images/test3.jpg" className="image_1" alt="Third slide" />
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Hero;
