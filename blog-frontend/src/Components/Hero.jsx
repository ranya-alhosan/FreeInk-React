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
								<img className="d-block w-100" src="/assets/images/test3.jpg" alt="First slide" />
								<div className="overlay_content text-center">
									<h2 className="text-white " style={{ fontSize: '5rem' }}>Welcome to FreeInk</h2>
									<p className="text-white fs-1 mb-4">Your words, your journey.</p>
									<div className="d-flex justify-content-center gap-3 mt-3">
										<Link to="/login" className="btn btn-primary custom_button">
											Add Post
										</Link>
										<Link to="/signup" className="btn btn-primary custom_button ">
											Signup
										</Link>
									</div>
								</div>
							</div>
						</Carousel.Item>
						<Carousel.Item>
							<div className="carousel_overlay">
								<img className="d-block w-100" src="/assets/images/test1.jpg" alt="Second slide" />
								<div className="overlay_content text-center">
									<h2 className="text-white " style={{ fontSize: '5rem' }}>Express Yourself</h2>
									<p className="text-white fs-1">Let your creativity flow.</p>
									<div className="d-flex justify-content-center gap-3 mt-3">
										<Link to="/login" className="btn btn-primary custom_button">
											Add Post
										</Link>
										<Link to="/signup" className="btn btn-primary custom_button ">
											Signup
										</Link>
									</div>
								</div>
							</div>
						</Carousel.Item>
						<Carousel.Item>
							<div className="carousel_overlay">
								<img className="d-block w-100" src="/assets/images/test2.jpg" alt="Third slide" />
								<div className="overlay_content text-center">
									<h2 className="text-white" style={{ fontSize: '5rem' }}>Join Our Community</h2>
									<p className="text-white fs-1">Connect with writers worldwide.</p>
                  <div className="d-flex justify-content-center gap-3 mt-3">
										<Link to="/login" className="btn btn-primary custom_button">
											Add Post
										</Link>
										<Link to="/signup" className="btn btn-primary custom_button ">
											Signup
										</Link>
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
