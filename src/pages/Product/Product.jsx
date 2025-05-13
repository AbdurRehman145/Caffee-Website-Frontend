import React from 'react';
import Footer from '../../components/Footer/Footer';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import './Product.css';

const Product = () => {
  return (
    <>
      <ProductHeader />
      <ProductDetails/>
    </>
  );
};

export default Product;
