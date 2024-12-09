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
