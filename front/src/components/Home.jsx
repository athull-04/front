import React from "react";
import { Link } from "react-router-dom";
import './css/home.css';  // Import the CSS file
import Header from "./Header";  // Import the Header component
import Footer from "./Footer";  // Import the Footer component

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />  {/* Use the Header component */}

      <section className="hero">
        <h1>Where Comfort Meets Style <br></br> Find Your Perfect Tee!</h1>
        <p>Explore the latest fashion trends</p>
        <Link to="/products" className="shop-now-btn">Shop Now</Link>
      </section>

      <section className="info">
        <div className="info-item">
          <h3>High Quality</h3>
          <p>We provide the highest quality clothing to match your style and comfort.</p>
        </div>
        <div className="info-item">
          <h3>Latest Trends</h3>
          <p>Stay ahead in fashion with our latest collections from top brands.</p>
        </div>
        <div className="info-item">
          <h3>Fast Shipping</h3>
          <p>Get your clothes delivered quickly and safely to your doorstep.</p>
        </div>
      </section>

      <Footer />  {/* Use the Footer component */}
    </div>
  );
};

export default HomePage;
