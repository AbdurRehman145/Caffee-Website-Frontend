import { useState } from "react";
import './TestimonialSlider.css'

const testimonials = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    name: "Jonny Thomas",
    role: "Project Manager",
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: "Another amazing testimonial from a happy client. Great work and super professional!",
    name: "Sarah Lee",
    role: "Marketing Head",
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    text: "Wonderful experience! I highly recommend their services to everyone.",
    name: "Mike Dawson",
    role: "CEO",
    img: "https://i.pravatar.cc/100?img=3",
  },
];

function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { text, name, role, img } = testimonials[currentIndex];

  return (
    <div className="testimonial-slider">
      <div className="testimonial-content">
        <div className="quote-icon">❝</div>
        <p className="testimonial-text">{text}</p>
        <h3 className="testimonial-name">{name}</h3>
        <p className="testimonial-role">{role}</p>
        <img className="testimonial-img" src={img} alt={name} />
      </div>

      <button className="nav-btn prev" onClick={prevTestimonial}>
        &#8592;
      </button>
      <button className="nav-btn next" onClick={nextTestimonial}>
        &#8594;
      </button>
    </div>
  );
}

export default TestimonialSlider;
