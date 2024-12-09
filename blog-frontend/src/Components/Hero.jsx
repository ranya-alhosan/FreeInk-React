import React from 'react';
import { Carousel, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '/public/assets/css/Hero.css';

function Hero() {
  return (
    <div className="">
      <Row>
        <Col>
          <Carousel interval={2000} controls={false} indicators={true} fade>
            <Carousel.Item>
              <div className="carousel_overlay">
                <img
                  className="d-block w-100"
                  src="/assets/images/test3.jpg"
                  alt="First slide"
                />
                <div className="overlay_content text-center">
                  <h2 className="text-white fs-1">Welcome to FreeInk</h2>
                  <p className="text-white fs-4">Your words, your journey.</p>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <Button variant="primary" className="custom_button">
                      <Link to="/login" className="text-white">
                      Add Post
                      </Link>
                    </Button>
                    <Button variant="primary" className="custom_button">
                      <Link to="/signup" className="text-black">
                        Signup
                      </Link>
                    </Button>
                    
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel_overlay">
                <img
                  className="d-block w-100"
                  src="/assets/images/test1.jpg"
                  alt="Second slide"
                />
                <div className="overlay_content text-center">
                  <h2 className="text-white fs-1">Express Yourself</h2>
                  <p className="text-white fs-4">Let your creativity flow.</p>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                  <Button variant="primary" className="custom_button">
                      <Link to="/login" className="text-white">
                      Add Post
                      </Link>
                    </Button>
                    <Button variant="primary" className="custom_button">
                      <Link to="/signup" className="text-black">
                        Signup
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel_overlay">
                <img
                  className="d-block w-100"
                  src="/assets/images/test2.jpg"
                  alt="Third slide"
                />
                <div className="overlay_content text-center">
                  <h2 className="text-white fs-1">Join Our Community</h2>
                  <p className="text-white fs-4">Connect with writers worldwide.</p>
                  <div className="d-flex justify-content-center gap-3 mt-3">
                  <Button variant="primary" className="custom_button">
                      <Link to="/login" className="text-white">
                      Add Post
                      </Link>
                    </Button>
                    <Button variant="primary" className="custom_button">
                      <Link to="/signup" className="text-black">
                        Signup
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default Hero;
