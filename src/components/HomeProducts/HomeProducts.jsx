import React, { useEffect, useState } from 'react';
import './HomeProducts.css';
import defaultProductImage from '../../assets/product1.png'; // Fallback image

const HomeProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate how many products to show at once and max scroll position
  const itemsToShow = 4;
  const maxIndex = Math.max(0, products.length - itemsToShow);

  const scroll = (direction) => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else if (direction === 'right' && currentIndex < maxIndex) {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
    }
  };

  // Use consistent percentage-based calculation
  const translateX = products.length > 0 ? -(currentIndex * (100 / products.length)) : 0;

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError('Unexpected data format received');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="recent-products-section">
        <h2>Recent Products</h2>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-products-section">
        <h2>Recent Products</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="recent-products-section">
      <h2>Recent Products</h2>
      <p>Choose your coffee</p>
      <div className="carousel-container">
        <button 
          className="arrow-prod left"
          onClick={() => scroll('left')}
          disabled={currentIndex <= 0}
        >
          &#8249;
        </button>

        <div className="carousel-wrapper">
          <div
            className="product-carousel animated-carousel"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <div className="product-card-home" key={product._id || product.id}>
                  <div className="image-wrapper">
                    <a href={`/products/${product.id}`}>
                      <img 
                        src={product.image || defaultProductImage}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = defaultProductImage;
                        }}
                      />
                    </a>
                  </div>
                  <div className="product-info-home">
                    <p className="product-name-home">{product.name}</p>
                    <p className="product-price-home">
                      <strong>${product.price}</strong>
                      {product.old_price && (
                        <span className="old-price-home">
                          ${product.old_price}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>

        <button 
          className="arrow-prod right"
          onClick={() => scroll('right')}
          disabled={currentIndex >= maxIndex}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default HomeProducts;