import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Create provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage if it exists
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Add voucher state
  const [appliedVoucher, setAppliedVoucher] = useState(() => {
    const savedVoucher = localStorage.getItem('appliedVoucher');
    return savedVoucher ? JSON.parse(savedVoucher) : null;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save voucher to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('appliedVoucher', JSON.stringify(appliedVoucher));
  }, [appliedVoucher]);

  // Add item to cart
  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // Check if product is already in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedVoucher(null); // Clear voucher when cart is cleared
  };

  // Apply voucher function
  const applyVoucher = (voucherCode) => {
    const code = voucherCode.toUpperCase().trim();
    
    if (code === 'SAVE10') {
      setAppliedVoucher({
        code: 'SAVE10',
        discount: 10,
        type: 'percentage'
      });
      return { success: true, message: '10% discount applied!' };
    } else if (code === 'SAVE20') {
      setAppliedVoucher({
        code: 'SAVE20',
        discount: 20,
        type: 'percentage'
      });
      return { success: true, message: '20% discount applied!' };
    } else {
      return { success: false, message: 'Invalid voucher code' };
    }
  };

  // Remove voucher function
  const removeVoucher = () => {
    setAppliedVoucher(null);
  };

  // Calculate cart totals
  const getCartTotals = () => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate discount
    let discount = 0;
    if (appliedVoucher && appliedVoucher.type === 'percentage') {
      discount = (subtotal * appliedVoucher.discount) / 100;
    }
    
    const total = subtotal - discount;

    return {
      itemCount,
      subtotal,
      discount,
      total,
      appliedVoucher
    };
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getCartTotals,
      applyVoucher,
      removeVoucher,
      appliedVoucher
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};