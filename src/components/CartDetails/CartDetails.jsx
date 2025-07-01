import React from 'react';
import { Link } from 'react-router-dom';
import './CartDetails.css';
import defaultProductImage from '../../assets/product1.png';
import { useCart } from '../CartDetails/CartContext';

const CartDetails = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotals } = useCart();
  const { itemCount, subtotal, salesTax, fbrCharges, total } = getCartTotals();

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Your Cart ({itemCount})</h2>
        
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img 
              src={item.image || defaultProductImage} 
              alt={item.name} 
              onError={(e) => (e.target.src = defaultProductImage)}
            />
            <div className="item-details">
              <p className="title">{item.name}</p>
              <p><strong>$ {item.price}</strong></p>
              {item.size && <p>Size: <strong>{item.size}</strong></p>}
              <p className="in-stock">In Stock</p>
              <div className="actions">
                <Link to={`/product/${item.id}`}>
                  <button>Edit</button>
                </Link>
                <button>Move To Wishlist</button>
              </div>
            </div>
            <div className="qty-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <button 
              className="trash-btn" 
              onClick={() => removeFromCart(item.id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <div className="cart-right">
        <div className="voucher-box">
          <h3>REDEEM YOUR VOUCHER</h3>
          <input type="text" placeholder="Enter Code" />
          <button>APPLY</button>
        </div>
        <div className="order-summary">
          <h3>ORDER SUMMARY</h3>
          <div className="summary-item">
            <span>Price incl. tax</span>
            <span>$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Sales Tax</span>
            <span>$ {salesTax.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>FBR service charges</span>
            <span>$ {fbrCharges.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>$ {total.toFixed(2)}</strong>
          </div>
          <a href="/checkout">
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
