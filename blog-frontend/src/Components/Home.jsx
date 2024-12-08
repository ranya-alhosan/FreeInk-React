import React, { useState, useEffect } from "react";
import axios from "../Api/axios";
import { useNavigate } from "react-router-dom";
function Home(){

    const [categories] = useState([
        {name: "Health & Sport", img: "/assets/images/cat1.png"},
        {name:  "Romance & Relationships", img: "/assets/images/cat2.png"},
        {name:  "Food & Recipes", img: "/assets/images/cat3.png"},
        {name:  "Travel & Adventure", img: "/assets/images/cat4.png"},
        {name:  "Education & Learning", img: "/assets/images/cat5.png"},
        {name:  "Politics & Current Affairs",img: "/assets/images/cat6.png"},
        {name:   "Art & Creativity",img: "/assets/images/cat7.png"},
        {name:   "History & Culture",img: "/assets/images/cat8.png"}
        
 
    ]);

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        {categories.map((category, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-3">
                                    <img src={category.img} className="card-img-top" alt="Category" />
                                    <div className="card-body">
                                        <h5 className="card-title">{category.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> </div> </div> </div>
                           

          
        </>
    )

    };


export default Home