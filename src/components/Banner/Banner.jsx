import React from 'react';
import './Banner.css';
import bannerImage from '../../assets/banner.jpg'; // Ensure you have the banner image saved in your project

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Coffee Banner" className="banner-image" />
      <div className="banner-text">
        <h1>A ROSTED COFFEE FOR YOU</h1>
        <p>The coffee is brewed by first roasting the green coffee beans over hot coals in a brazier, given the best treatment.</p>
        <button className="shop-now">SHOP NOW</button>
      </div>
    </div>
  );
};

export default Banner;
