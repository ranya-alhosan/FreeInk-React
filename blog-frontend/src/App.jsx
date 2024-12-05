import { useState } from 'react';
import Head from './Components/Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from  './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Hero  from './Components/Hero';
import './App.css'
// import Signup from './Components/Signup';
// import Login from './Components/Login';

function App() {
  

  return (
    <>
      <Head />
      <NavBar/>
      <Hero/>
      <Home/>
      {/* <Signup/> */}
      {/* <Login/> */}
      <Footer/>
    </>
  )
}

export default App
