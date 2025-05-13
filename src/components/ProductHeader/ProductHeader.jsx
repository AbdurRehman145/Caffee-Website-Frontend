import React from 'react';
import './ProductHeader.css';

const ProductHeader = () => {
  return (
    <div className="product-header">
      <div className="container">
        <h1 className="product-title">Products</h1>
        <nav className="breadcrumb">
          <span>Home</span>
          <span className="separator">/</span>
          <span className="current">Products</span>
        </nav>
      </div>
    </div>
  );
};

export default ProductHeader;
