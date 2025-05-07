import React, { useState } from "react";
import "./TestimonialSlider.css";

import user1 from "../../assets/chef.jpg";   // replace with real paths
import user2 from "../../assets/chef.jpg";
import user3 from "../../assets/chef.jpg";

const testimonials = [
  {
    image: user1,
    quote:
      "Very good quality of food and service. Vast menu with child friendly items as well as local seafood and even entrees for those who dont like seafood. Great place! Thanks. We absolutely love everything there!",
    name: "De Willamson",
    title: "Founder & co"
  },
  {
    image: user2,
    quote:
      "Coffee is excellent and the ambience is superb. Staff are knowledgeable and friendly. Highly recommend to every coffee lover around!",
    name: "Maria Stevens",
    title: "Coffee Blogger"
  },
  {
    image: user3,
    quote:
      "Probably the best espresso I had this year. The beans are roasted to perfection and the desserts pair perfectly.",
    name: "Kenji Takahashi",
    title: "Food Critic"
  }
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const { image, quote, name, title } = testimonials[index];

  return (
    <section className="testimonial-section">
      {/* arrows */}
      <button className="nav-arrow left" onClick={prev} aria-label="Previous">
        <span />
      </button>

      <div className="testimonial-wrapper">
        <div className="avatar">
          <img src={image} alt={name} />
        </div>

        <div className="testimonial">
          <div className="quote-mark">❝</div>
          <p>{quote}</p>
          <h4>{name}</h4>
          <span className="title">{title}</span>
        </div>
      </div>

      <button className="nav-arrow right" onClick={next} aria-label="Next">
        <span />
      </button>
    </section>
  );
}
