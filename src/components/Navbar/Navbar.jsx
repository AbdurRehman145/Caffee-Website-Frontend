import React from 'react';
import './Navbar.css'; 
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faHeart, faShoppingCart} from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
       <span className="brand">ban's</span>
        <span>SINCE</span>
        <span>1998</span>
      </div>
      <ul className="nav-links">
        <li><a href="/">HOME</a></li>
        <li><a href="/shop">SHOP</a></li>
        <li><a href="#">BLOG</a></li>
        <li><a href="#">ABOUT US</a></li>
        <li><a href="#">CONTACT</a></li>

      </ul>
    <div className="icons">
      <button>
       <FontAwesomeIcon icon={faSearch} /> 
      </button>
      <button>
       <FontAwesomeIcon icon={faUser} /> 
      </button>
      <button>
       <FontAwesomeIcon icon={faHeart} /> 
      </button>
      <a href="/cart">
        <button>
         <FontAwesomeIcon icon={faShoppingCart} /> 
        </button>
      </a>
    </div>
     
    </nav>
  );
}

export default Navbar;
