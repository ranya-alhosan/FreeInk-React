import React, { useState } from 'react';
import Slider from 'react-slick';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
 import 'slick-carousel/slick/slick-theme.css';
import Head from './Head';
import NavBar from './NavBar';
import Footer from './Footer';
import SubHero from './SubHero';
import "/public/assets/css/about.css";

function About() {
  const [teamMembers] = useState([
    {
      name: "Ranya Al-Hosan",
      role: "Scrum Master",
      image: "/assets/images/rania.jpg",
      description: "Driving innovation and team collaboration with strategic leadership.",
      skills: ["Laravel&React", "Team Management", "Strategic Planning"],
      socials: {
        linkedin: "https://www.linkedin.com/in/ranya-al-hosan-370634264/",
        github: "https://github.com/ranya-alhosan",
      }
    },
    {
      name: "Mousa Ala'aldin",
      role: "Product Owner",
      image: "/assets/images/mosa.jpg", 
      description: "Passionate about creating user-centric platforms that empower expression.",
      skills: ["Laravel", "User Experience", "Database Design"],
      socials: {
        linkedin: "https://www.linkedin.com/in/mousa-alaaldeen/",
        github: "https://github.com/Mousa-alaaldeen",
      }
    },
    {
      name: "Omar Safi",
      role: "Back-End Developer",
      image: "/assets/images/omar.jpg",
      description: "Designing and maintaining robust and secure backend architectures.",
      skills: ["Laravel", "Database Design", "API Development"],
      socials: {
        linkedin: "https://www.linkedin.com/in/omar-safi-63a508327/",
        github: "https://github.com/Omarsafii2",
      }
    },
    {
      name: "Abdallah Almomani",
      role: "Front-End Developer",
      image: "/assets/images/abd.png",
      description: "Building user-friendly and visually appealing interfaces",
      skills: ["React", "UI/UX Design", "Responsive Web"],
      socials: {
        linkedin: "https://www.linkedin.com/in/abdallah-almomany/",
        github: "https://github.com/Abdallah-Almomani99",
      }
    },
    {
      name: "Loay Alrwedat",
      role: "Front-End Developer",
      image: "/assets/images/loay.jpg",
      description: "Bringing designs to life with clean and efficient code",
      skills: ["JavaScript", "Laravel", "React"],
      socials: {
        linkedin: "https://www.linkedin.com/in/loay-raed-b8b901337/",
        github: "https://github.com/loiy01",
      }
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
    centerMode: true,
    centerPadding: '0px',
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
  <SubHero title="About FreeInk" subtitle="A platform for expressing opinions freely and sharing thoughts with the world."/>
      <div className="container about-section py-5">
        {/* Vision and Mission Sections */}
        <div className="row">
          <div className="col-lg-6">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-des">FreeInk is more than a platform—it's a digital sanctuary for unfiltered thought. We believe in the power of unrestricted creativity, providing a space where every voice can resonate, every perspective can find its audience.</p>
          </div>
          <div className="col-lg-6">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-des">To democratize content creation, breaking down barriers between writers and readers. We're committed to fostering an inclusive, respectful environment where diverse thoughts can flourish without judgment.</p>
          </div>
        </div>

        {/* Features Section */}
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
                <h4 className='features-section-title'>{feature.title}</h4>
                <p className='features-section-des'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="creative-team-slider container py-5">
        <h2 className="text-center section-title mb-5">Meet Our Innovators</h2>
        <Slider {...sliderSettings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-slide">
              <div className="team-card">
                <div className="team-card-inner">
                  <div className="team-card-front">
                    <div className="team-image-wrapper">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="team-member-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="team-member-info">
                      <h3>{member.name}</h3>
                      <p className="text-muted">{member.role}</p>
                    </div>
                  </div>
                  <div className="team-card-back">
                    <div className="team-member-details">
                      <p>{member.description}</p>
                      <div className="team-member-skills">
                        <h4>Key Skills</h4>
                        <div className="skills-list">
                          {member.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="social-links">
                        <a href={member.socials.linkedin} className="social-icon">
                          <i className="fab fa-linkedin"></i>
                        </a>
                        <a href={member.socials.github} className="social-icon">
                          <i className="fab fa-github"></i>
                        </a>
                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

        {/* Call to Action */}
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