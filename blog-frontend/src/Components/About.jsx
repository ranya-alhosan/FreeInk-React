import React, { useState } from 'react';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from './Head';
import NavBar from './NavBar';
import Footer from './Footer';
import "/public/assets/css/about.css";

function About() {
  const [teamMembers] = useState([
    {
      name: "Ranya Al-Hosan",
      role: "Scrum Master",
      image: "/assets/images/rania.jpg",
      description: "Driving innovation and team collaboration with strategic leadership."
    },
    {
      name: "Mousa Ala'aldin",
      role: "Product Owner",
      image: "/assets/images/mosa.jpg", 
      description: "Passionate about creating user-centric platforms that empower expression."
    },
    {
      name: "Omar Safi",
      role: " Back-End Developer",
      image: "/assets/images/omar.jpg",
      description: "Designing and maintaining robust and secure backend architectures."
    },
    {
      name: "Abdallah Almomani",
      role: " Front-End Developer",
      image: "/assets/images/abd.png",
      description: "Building user-friendly and visually appealing interfaces"
    },
    {
      name: "loay alrwedat",
      role: "Front-End Developer",
      image: "/assets/images/loay.jpg",
      description: "Bringing designs to life with clean and efficient code"
    }
  ]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <Head />
      <NavBar />

      {/* Banner Section (Unchanged from original) */}
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content container">
          <div className="row align-items-center">
            <div className="col-lg-8 offset-lg-2 text-center">
              <h1 className="banner-title animate-on-load">About FreeInk</h1>
              <p className="banner-subtitle animate-on-load">
              A platform for expressing opinions freely and sharing thoughts with the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container about-section py-5">
        {/* Vision and Mission Sections (Unchanged) */}
        <div className="row">
          <div className="col-lg-6">
            <h2 className="section-title">Our Vision</h2>
            <p>FreeInk is more than a platform—it's a digital sanctuary for unfiltered thought. We believe in the power of unrestricted creativity, providing a space where every voice can resonate, every perspective can find its audience.</p>
          </div>
          <div className="col-lg-6">
            <h2 className="section-title">Our Mission</h2>
            <p>To democratize content creation, breaking down barriers between writers and readers. We're committed to fostering an inclusive, respectful environment where diverse thoughts can flourish without judgment.</p>
          </div>
        </div>

        {/* Features Section (Unchanged) */}
        <section className="features-section my-5">
          <h2 className="text-center section-title">Platform Highlights</h2>
          <div className="row">
            {[
              { icon: "✍️", title: "Unrestricted Publishing", desc: "Express without limits" },
              { icon: "👤", title: "Dynamic Profiles", desc: "Your digital identity" },
              { icon: "🏷️", title: "Smart Categorization", desc: "Content that finds you" },
              { icon: "🤝", title: "Community Interaction", desc: "Connect, engage, grow" }
            ].map((feature, index) => (
              <div key={index} className="col-md-3 feature-item text-center">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section with Slider */}
        <section className="team-section my-5">
          <h2 className="text-center section-title">Meet Our Creators</h2>
          <Slider {...sliderSettings}>
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member text-center px-3">
                <div className="member-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="img-fluid rounded-circle member-image"
                  />
                </div>
                <h4>{member.name}</h4>
                <p className="text-muted">{member.role}</p>
                <p>{member.description}</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Call to Action (Unchanged) */}
        <section className="cta-section text-center py-5">
          <h2 className="mb-4">Your Story Starts Here</h2>
          <p className="lead mb-4">Join thousands of voices. Share your perspective.</p>
          <a href="/signup" className="btn btn-lg pulse-animation end-action">Create Your Free Account</a>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default About;