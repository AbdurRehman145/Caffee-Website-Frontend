import React from 'react'
import './Footer.css'; 
const Footer = () => {
return (
<>
<footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Bean Scene</h2>
          <p className="footer-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
          <div className="footer-socials">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>

        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li>Menu</li>
            <li>Features</li>
            <li>News & Blogs</li>
            <li>Help & Support</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>How we work</li>
            <li>Terms of service</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Akshya Nagar 1st Block 1st Cross, Ramamurthy nagar, Bangalore-560016</p>
          <p>+1 202-918-2132</p>
          <p>beanscene@email.com</p>
          <p>www.beanscene.com</p>
        </div>
      </div>
    </footer>
</>
  )
}
export default Footer
