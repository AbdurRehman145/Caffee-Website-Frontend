import React, { useState } from 'react';
import './ProductGrid.css';
import product from '../../assets/product1.png';
const products = [
  {
    name: "Black Coffee Grid",
    price: "$150.00",
    image: product,
    label: null,
    oldPrice: null,
  },
  {
    name: "Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: "soldout",
  },
  {
    name: "Ethiopia Coffee Grid",
    price: "$150.00",
    image: product,
    label: null,
    oldPrice: null,
  },
  {
    name: "Cold Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: "sale",
    discount: "-20%",
  },
  {
    name: "Cold Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: null,
    discount: null,
  },
  {
    name: "Cold Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: null,
    discount: null,
  },
  {
    name: "Cold Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: null,
    discount: null,
  },
  {
    name: "Cold Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: null,
    discount: null,
  },
  {
    name: "Cold Brew Coffee Beans",
    price: "$80.00",
    oldPrice: "$100.00",
    image: product,
    label: null,
    discount: null,
  }
];

const ProductGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
  
    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    return (
      <div>
        <div className="product-grid">
          {currentProducts.map((product, idx) => (
            <div className="product-card" key={idx}>
              <div className="image-wrapper">
                {product.label && (
                  <span className={`label ${product.label === "soldout" ? "soldout" : "sale"}`}>
                    {product.label}
                  </span>
                )}
                {product.discount && <span className="discount">{product.discount}</span>}
                <a href="/Product"><img src={product.image} alt={product.name} /></a>
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="price">
                  <span className="current">{product.price}</span>
                  {product.oldPrice && <span className="old">{product.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
  
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
      </div>
    );
  };
  
  export default ProductGrid;
  