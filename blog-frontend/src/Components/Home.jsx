import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [categories] = useState([
    { name: "Health & Sport", img: "/assets/images/cat1.png" },
    { name: "Romance & Relationships", img: "/assets/images/cat2.png" },
    { name: "Food & Recipes", img: "/assets/images/cat3.png" },
    { name: "Travel & Adventure", img: "/assets/images/cat4.png" },
    { name: "Education & Learning", img: "/assets/images/cat5.png" },
    { name: "Politics & Current Affairs", img: "/assets/images/cat6.png" },
    { name: "Art & Creativity", img: "/assets/images/cat7.png" },
    { name: "History & Culture", img: "/assets/images/cat8.png" },
  ]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Explore Categories</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-4 col-lg-3 mb-4" key={index}>
            <Link to={`/blogposts?category=${encodeURIComponent(category.id)}`} className="text-decoration-none">
             <div className="card shadow-sm h-100">
                <img
                  src={category.img}
                  className="card-img-top img-fluid"
                  alt={category.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title text-dark">{category.name}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

=======
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '/public/assets/css/home.css';

function Home() {
  return (
    <div className="container">
      <h2 className="text-center my-5">What Our Clients Say</h2>
      
      <Row>
        {/* Testimonial 1 */}
        <Col md={3}>
          <Card className="testimonial-card">
            <Card.Body>
              <div className="testimonial-header">
                <img
                  src="/assets/images/per1.jpg" 
                  alt="User 1"
                  className="testimonial-image rounded-circle mb-2"
                />
                <div className="testimonial-name">
                  <strong>John Doe</strong>
                </div>
              </div>
              <Card.Text>
                "FreeInk has transformed the way I write. The platform is intuitive, and the community is amazing!"
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Testimonial 2 */}
        <Col md={3}>
          <Card className="testimonial-card">
            <Card.Body>
              <div className="testimonial-header">
                <img
                  src="/assets/images/per2.jpg" 
                  alt="User 2"
                  className="testimonial-image rounded-circle mb-2"
                />
                <div className="testimonial-name">
                  <strong>Jane Smith</strong>
                </div>
              </div>
              <Card.Text>
                "A great platform for writers of all levels. It’s user-friendly, and I love the supportive community!"
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Testimonial 3 */}
        <Col md={3}>
          <Card className="testimonial-card">
            <Card.Body>
              <div className="testimonial-header">
                <img
                  src="/assets/images/per3.jpg" 
                  alt="User 3"
                  className="testimonial-image rounded-circle mb-2"
                />
                <div className="testimonial-name">
                  <strong>Alex Johnson</strong>
                </div>
              </div>
              <Card.Text>
                "I’ve found my writing voice here. FreeInk has everything I need to express myself and grow."
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Testimonial 4 */}
        <Col md={3}>
          <Card className="testimonial-card">
            <Card.Body>
              <div className="testimonial-header">
                <img
                  src="/assets/images/per4.jpg" 
                  alt="User 4"
                  className="testimonial-image rounded-circle mb-2"
                />
                <div className="testimonial-name">
                  <strong>Emily Davis</strong>
                </div>
              </div>
              <Card.Text>
                "FreeInk is the perfect place to unleash your creativity and connect with other writers."
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}


export default Home;
