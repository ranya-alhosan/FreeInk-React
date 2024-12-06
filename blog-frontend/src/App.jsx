import { useState } from 'react';
import Head from './Components/Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from  './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Hero  from './Components/Hero';
import './App.css'

function App() {
  

  return (
    <>
      <Head />
      <NavBar/>
      <Hero/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
