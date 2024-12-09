import React from 'react';
import { Carousel, Card, Row, Col } from 'react-bootstrap';

const TestimonialsSlider = () => {
  const testimonials = [
    {
      img: "/assets/images/per1.jpg",
      name: "John Doe",
      text: "FreeInk has transformed the way I write. The platform is intuitive, and the community is amazing!",
    },
    {
      img: "/assets/images/per2.jpg",
      name: "Jane Smith",
      text: "A great platform for writers of all levels. It’s user-friendly, and I love the supportive community!",
    },
    {
      img: "/assets/images/per3.jpg",
      name: "Alex Johnson",
      text: "I’ve found my writing voice here. FreeInk has everything I need to express myself and grow.",
    },
    {
      img: "/assets/images/per4.jpg",
      name: "Emily Davis",
      text: "FreeInk is the perfect place to unleash your creativity and connect with other writers.",
    },
    {
      img: "/assets/images/per5.jpg",
      name: "Michael Brown",
      text: "This platform has boosted my confidence in sharing my stories. Highly recommended!",
    },
    {
      img: "/assets/images/per6.jpg",
      name: "Sarah Wilson",
      text: "I love how FreeInk brings writers together. It’s a game changer!",
    },
  ];

  // تقسيم التستيمونيال إلى مجموعات من 3 بطاقات
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    groupedTestimonials.push(testimonials.slice(i, i + 3));
  }

  return (
    <Carousel interval={3000} pause="hover">
      {groupedTestimonials.map((group, groupIndex) => (
        <Carousel.Item key={groupIndex}>
          <Row className="justify-content-center">
            {group.map((testimonial, index) => (
              <Col md={4} key={index}>
                <Card className="testimonial-card text-center mx-auto mb-4">
                  <Card.Body>
                    <div className="testimonial-header">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="testimonial-image rounded-circle mb-3"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <div className="testimonial-name">
                        <strong>{testimonial.name}</strong>
                      </div>
                    </div>
                    <Card.Text>{testimonial.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TestimonialsSlider;
