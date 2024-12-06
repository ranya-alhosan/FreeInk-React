import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter ,Routes,Route } from "react-router-dom"; 
import App from "./App"; 
import About from './Components/About';
import BlogPost from './Components/BlogPost';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profial from './Components/Profial';
import Home from './Components/Home';
import Contact from './Components/Contact'
import PostForm from './Components/PostForm'


const Root = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "assets/js/main.js"; 
    script.async = true; 
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogPost" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profial" element={<Profial />} />
        <Route path="post" element={<PostForm />} />
      </Routes>

     
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
