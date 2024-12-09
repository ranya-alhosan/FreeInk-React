import React, { useState } from "react";
import apiClient from "../Api/apiClient";
import Head from './Head';
import NavBar from './NavBar';
import Footer from './Footer';
import SubHero from './SubHero';
import "/public/assets/css/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [feedback, setFeedback] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/contact", formData);
      setFeedback({
        success: true,
        message: response.data.message || "Contact form submitted successfully!",
      });
      // Reset form after successful submission
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setFeedback({
          success: false,
          message: "Validation error: " + Object.values(error.response.data.errors).join(", "),
        });
      } else {
        setFeedback({
          success: false,
          message: "Failed to submit. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <Head />
      <NavBar />
      <SubHero title="Contact Us"/>

      <div className="contact-container">
        <div className="contact-form-wrapper">
          <div className="text-center">
            <p className="contact-subtitle">
              We'd love to hear from you! Please fill out the form below.
            </p>
          </div>

          {feedback.message && (
            <div className={`
              feedback-message 
              ${feedback.success 
                ? "feedback-success" 
                : "feedback-error"
              }
            `}>
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Email"
              />
            </div>
            
            <div>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="Subject"
              />
            </div>
            
            <div>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Message"
                rows={4}
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="submit-button"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default Contact;