import React, { useState } from 'react';
import './CartDetails.css';
import product from '../../assets/product1.png';

const CartDetails = () => {
  const [quantity, setQuantity] = useState(2);

  const unitPrice = 2800;
  const priceInclTax = unitPrice * quantity;
  const salesTax = 854;
  const fbrCharges = 1;
  const total = priceInclTax + salesTax + fbrCharges;

  const increaseQty = () => setQuantity(qty => qty + 1);
  const decreaseQty = () => setQuantity(qty => (qty > 1 ? qty - 1 : 1));

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Your Bag ({quantity})</h2>
        <div className="cart-item">
          <img src= {product} alt="Fabrics 2 Piece" />
          <div className="item-details">
            <p className="title">Fabrics 2 Piece | Top and Bottom</p>
            <p><strong>PKR {unitPrice}</strong></p>
            <p>Size: <strong>2PC</strong></p>
            <p className="in-stock">In Stock</p>
            <div className="actions">
              <button>Edit</button>
              <button>Move To Wishlist</button>
            </div>
          </div>
          <div className="qty-controls">
            <button onClick={decreaseQty}>−</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>
          <button className="trash-btn">🗑</button>
        </div>
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
            <span>PKR {priceInclTax}</span>
          </div>
          <div className="summary-item">
            <span>Sales Tax</span>
            <span>PKR {salesTax}</span>
          </div>
          <div className="summary-item">
            <span>FBR service charges</span>
            <span>PKR {fbrCharges}</span>
          </div>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>PKR {total}</strong>
          </div>
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
