import React, { useState, useEffect } from 'react';
import './ProductGrid.css';
import defaultProductImage from '../../assets/product1.png';

const ProductGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const productsPerPage = 6;

  useEffect(() => {
    setLoading(true);
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
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);


  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: document.querySelector('.product-grid').offsetTop - 100, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="loading-container">Loading products...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="empty-container">No products available</div>;
  }

  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div className="product-card" key={product._id || product.id}>
            <div className="image-wrapper">
              {product.label && (
                <span className={`label ${product.label.toLowerCase() === "soldout" ? "soldout" : "sale"}`}>
                  {product.label}
                </span>
              )}
              {product.discount && <span className="discount">{product.discount}</span>}
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
            <div className="product-info">
              <h4>{product.name}</h4>
              <div className="price">
                <span className="current">${parseFloat(product.price).toFixed(2)}</span>
                <span className="old">${parseFloat(product.old_price).toFixed(2)}</span>
            
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </span>
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <span
            className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
