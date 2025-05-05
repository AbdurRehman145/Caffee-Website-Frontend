import React from 'react';
import './MenuCard.css'
import Button from '../Button/Button';
const MenuCard = ({ image, title, category, amount, buttonText }) => {
  return (
    <div className="menu-card">
      <img src={image} alt={title} className="card-image" />
     <div className='card-details'>
     <h2> {title}</h2>
      <span className='category-span'>{category}</span>
      <span className='amount-span'>{amount}</span>
      <Button label="Order Now" href="/" />
     </div>
    </div>
  );
};

export default MenuCard;
