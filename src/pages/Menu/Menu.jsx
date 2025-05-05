import React from 'react';
import './Menu.css';
import MenuCard from '../../components/MenuCard/MenuCard';
import menuThumbnail from '../../assets/menu-thumbnail.png'; 
import menuThumbnail1 from '../../assets/menu-thumbnail1.png'; 
import menuThumbnail2 from '../../assets/menu-thumbnail2.png'; 
import menuThumbnail3 from '../../assets/menu-thumbnail3.png'; 
const cardData = [
  {
    image: menuThumbnail, 
    title: "Cappuccino",
    category: "Coffee 50% | Milk 50%",
    amount: "$8.50",
  },
  {
    image: menuThumbnail1, 
    title: "Chai Latte",
    category: "Coffee 50% | Milk 50%",
    amount: "$8.50",
  },
  {
    image: menuThumbnail2,
    title: "Macchiato",
    category: "Coffee 50% | Milk 50%",
    amount: "$8.50",
  },
  {
    image: menuThumbnail3,
    title: "Expresso",
    category: "Coffee 50% | Milk 50%",
    amount: "$8.50",
  },
];
const Menu = () => {
  return (
    <section id='menu' className="menu-section">
      <div className="container">
        <h2>Enjoy a new blend of coffee style</h2>
        <p>Explore all flavours of coffee with us. There is always a new cup worth experiencing</p>
        <div className="menu">
          {cardData.map((card, index) => (
            <MenuCard
              key={index}
              image={card.image}  
              title={card.title}
              category={card.category}
              amount={card.amount}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Menu;
