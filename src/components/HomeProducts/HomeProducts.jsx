import React, { useState } from 'react';
import './HomeProducts.css';
import coffee1 from '../../assets/product1.png';
import coffee2 from '../../assets/product1.png';
import coffee3 from '../../assets/product1.png';
import coffee4 from '../../assets/product1.png';
// ... other imports

const products = [
    {
        id: 1,
        name: 'Brew Coffee Beans',
        price: 80,
        oldPrice: 100,
        label: 'soldout',
        image: coffee1,
      },
      {
        id: 2,
        name: 'Cold Brew Coffee Beans',
        price: 80,
        oldPrice: 100,
        label: 'sale',
        discount: '20%',
        image: coffee2,
      },
      {
        id: 3,
        name: 'Latte Macchiato Coffee',
        price: 130,
        oldPrice: 150,
        label: 'sale',
        discount: '13%',
        image: coffee3,
      },
      {
        id: 4,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee4,
      },
      {
        id: 5,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee2,
      },
      {
        id: 6,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee1,
      },
      {
        id: 7,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee3,
      },
      {
        id: 8,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee4,
      },
      {
        id: 9,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee4,
      },
      {
        id: 10,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee4,
      },
      {
        id: 11,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee4,
      },
      {
        id: 12,
        name: 'Columbia Black Coffee',
        price: 150,
        image: coffee4,
      }
];
const itemsPerPage = 4;

const HomeProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = 0.6;

  const scroll = (direction) => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 0.3);
    } else if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 0.3);
    }
  };

  const translateX = -currentIndex * 89;

  return (
    <div className="recent-products-section">
      <h2>Recent Products</h2>
      <p>Choose your coffee</p>
      <div className="carousel-container">
        <button className="arrow-prod left" onClick={() => scroll('left')}>&#8249;</button>

        <div className="carousel-wrapper">
          <div
            className="product-carousel animated-carousel"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {products.map((product) => (
              <div className="product-card-home" key={product.id}>
                <div className="image-wrapper">
                  <a href="/product"><img src={product.image} alt={product.name} /></a>
                </div>
                <div className="product-info-home">
                  <p className="product-name-home">{product.name}</p>
                  <p className="product-price-home">
                    <strong>${product.price.toFixed(2)}</strong>
                    {product.oldPrice && (
                      <span className="old-price-home">${product.oldPrice.toFixed(2)}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="arrow-prod right" onClick={() => scroll('right')}>&#8250;</button>
      </div>
    </div>
  );
};

export default HomeProducts;
