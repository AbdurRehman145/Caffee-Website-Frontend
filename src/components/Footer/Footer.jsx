// FooterComponent.jsx
import { useState } from "react";
import { ArrowRight, Twitter, Instagram, Linkedin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = () => {
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand and tagline */}
        <div className="footer-brand">
          <div className="brand-header">
            <span className="since-text">SINCE</span>
            <h2 className="brand-name">ban's</h2>
            <span className="year-text">1998</span>
          </div>
          <p className="tagline">
            There are people who can't start their day without having a freshly brewed cup of coffee and we understand them.
          </p>
        </div>

        {/* About section */}
        <div className="footer-section">
          <h3 className="footer-heading">ABOUT</h3>
          <ul className="footer-links">
            <li><a href="#">Search</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Account</a></li>
          </ul>
        </div>

        {/* Useful links */}
        <div className="footer-section">
          <h3 className="footer-heading">USEFUL LINKS</h3>
          <ul className="footer-links">
            <li><a href="#">Search</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Account</a></li>
          </ul>
        </div>

        {/* Social media */}
        <div className="footer-section">
          <h3 className="footer-heading">FOLLOW US ON</h3>
          <ul className="footer-links">
            <li>
              <a href="#" className="social-link">
                <Twitter size={16} className="icon" />
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <Instagram size={16} className="icon" />
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="social-link">
                <Linkedin size={16} className="icon" />
                Linkedin
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription */}
        <div className="footer-newsletter">
          <h2 className="newsletter-heading">Subscribe.</h2>
          <p className="newsletter-text">
            Subscribe to our newsletter to receive news on update.
          </p>
          <div className="subscription-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address."
              className="email-input"
            />
            <button
              onClick={handleSubmit}
              className="submit-button"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}