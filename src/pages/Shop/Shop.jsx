import React from 'react';
import Footer from '../../components/Footer/Footer';
import ProductHeader from '../../components/ProductHeader/ProductHeader';
import SidebarFilter from '../../components/SidebarFilter/SidebarFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import './Shop.css';

const Shop = () => {
  return (
    <>
      <ProductHeader />
      <div className="shop-layout">
        <SidebarFilter />
        <ProductGrid />
      </div>
    </>
  );
};

export default Shop;
