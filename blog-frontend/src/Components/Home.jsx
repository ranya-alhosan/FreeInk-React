
import React from 'react';
import '/public/assets/css/home.css';
import TestimonialsSlider from './TestimonialsSlider';

function Home() {
  return (
    <div className="container">
      <h2 className="text-center my-5">What Our Clients Say</h2>
        <TestimonialsSlider /> 
    </div>
  );
}


export default Home;
