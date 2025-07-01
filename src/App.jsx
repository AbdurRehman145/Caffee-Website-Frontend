import React from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'; 
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderConfirmed from './pages/OrderConfirmed/OrderConfirmed';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { CartProvider  } from "./components/CartDetails/CartContext"; 
import { CheckoutProvider } from './components/Contexts/CheckoutContext';

const App = () => {
  return (
    
      <BrowserRouter>
      <CartProvider>
      <CheckoutProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path='/order-confirmed' element={<OrderConfirmed/>} />
        </Routes>
        <Footer/>
        </CheckoutProvider>
    </CartProvider>
      </BrowserRouter>
      
  );
};

export default App;
