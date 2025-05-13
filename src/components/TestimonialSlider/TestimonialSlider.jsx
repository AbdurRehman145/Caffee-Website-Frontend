import React, { useState } from "react";
import "./TestimonialSlider.css";
import photo1 from "../../assets/chef.jpg";
import photo2 from "../../assets/chef.jpg";
import photo3 from "../../assets/chef.jpg";
import coffeePlant from '../../assets/coffee-plant.png'; 

const data = [
  {
    img: photo1,
    quote:
      "Very good quality of food and service. Vast menu with child‑friendly items as well as local seafood and even entrées for those who don’t like seafood. Great place! Thanks. We absolutely love everything there!",
    name: "De Williamson",
    role: "Founder & Co"
  },
  {
    img: photo2,
    quote:
      "Super cosy atmosphere and the coffee blew my mind. Staff greeted us like family and every pastry tasted home‑made. Five stars from me.",
    name: "Peter Hanks",
    role: "Head Chef – FortyTwo"
  },
  {
    img: photo3,
    quote:
      "I’ve travelled the world searching for the perfect flat white – this is where that journey ends. Sublime!",
    name: "Maria Gomez",
    role: "World Barista Champ 2022"
  }
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? data.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === data.length - 1 ? 0 : i + 1));

  const { img, quote, name, role } = data[index];

  return (
    <section className="testi-section">
      {/* image  */}
      <div className="testi-img-wrapper">
        <img src={img} alt={name} />
      </div>

      {/* arrows */}
      <button className="arrow left" onClick={prev} aria-label="Previous" />
      <button className="arrow right" onClick={next} aria-label="Next" />

      {/* text block */}
      <div className="testi-text">
        <span className="quote-mark">❝</span>
        <p>{quote}</p>
        <h4>{name}</h4>
        <span className="role">/ {role}</span>
      </div>

      <div className="plant-image">
        <img src={coffeePlant} alt="plant" />
      </div>
    </section>
  );
};

export default TestimonialSlider;
