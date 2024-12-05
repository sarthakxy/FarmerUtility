// Testimonials.js
import React, { useRef } from 'react';
import './Testimonials.css';

const testimonials = [
    { name: "Raj Kumar", feedback: "This app has transformed my farming business with real-time insights." },
    { name: "Sita Devi", feedback: "I can now plan better with reliable crop price data. A must-have!" },
    { name: "Amit Sharma", feedback: "Excellent support for farmers like me, especially for payment tracking!" },
    { name: "Mohan Yadav", feedback: "The AI-based predictions have helped me maximize my profits!" },
    { name: "Geeta Patel", feedback: "Easy to use and secure payments make my transactions hassle-free." },
    { name: "Ravi Kumar", feedback: "Real-time prices and secure payments all in one app. Highly recommend!" },
    { name: "Lakshmi Singh", feedback: "It has empowered me with the right data to make informed decisions." },
    { name: "Devender Chauhan", feedback: "Very reliable and accurate, especially for regional price updates." }
];

const Testimonials = () => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="testimonials-section">
            <h2>What Farmers Say</h2>
            <div className="testimonials-carousel" ref={carouselRef}>
                {testimonials.map((testimonial, index) => (
                    <div className="testimonial-item" key={index}>
                        <p className="testimonial-feedback">"{testimonial.feedback}"</p>
                        <h4 className="testimonial-name">- {testimonial.name}</h4>
                    </div>
                ))}
            </div>
            <button className="carousel-button left" onClick={scrollLeft}>{"<"}</button>
            <button className="carousel-button right" onClick={scrollRight}>{">"}</button>
        </div>
    );
};

export default Testimonials;
