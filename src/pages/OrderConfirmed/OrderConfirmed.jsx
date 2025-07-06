import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, Printer, Home } from 'lucide-react';
import { useCart } from '../../components/CartDetails/CartContext';
import { useCheckout } from '../../components/Contexts/CheckoutContext';
import defaultProductImage from '../../assets/product1.png';
import './OrderConfirmed.css';

export default function OrderConfirmed() {
  const navigate = useNavigate();
  const { cartItems, getCartTotals } = useCart();
  const { checkoutData } = useCheckout();
  
  const [isShippingExpanded, setIsShippingExpanded] = useState(true);
  const [isOrderDetailsExpanded, setIsOrderDetailsExpanded] = useState(true);

  const toggleShipping = () => setIsShippingExpanded(!isShippingExpanded);
  const toggleOrderDetails = () => setIsOrderDetailsExpanded(!isOrderDetailsExpanded);

  const orderTotals = checkoutData.orderTotals || getCartTotals();
  const orderItems = checkoutData.orderItems || cartItems;

  const subtotal = orderTotals.subtotal || 0;
  const shipping = orderTotals.shipping;
  const discount = orderTotals.discount || 0;
  const finalTotal = orderTotals.finalTotal || (subtotal + shipping - discount);
  
  // Format estimated delivery date for display
  const formatDeliveryDate = (dateString) => {
    if (!dateString) return 'May 20 - May 24, 2025';
    
    const date = new Date(dateString);
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    
    // Create end date (3 days after estimated delivery for range)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 3);
    
    return `${date.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };
  
  // Handle continue shopping
  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="order-confirmation-container">
      {/* Left Column */}
      <div className="order-details-column">
        {/* Order Confirmation Header */}
        <div className="order-header">
          <Check className="order-header-icon" size={36} />
          <h2 className="order-header-title">ORDER CONFIRMED</h2>
          <button className="print-button">
            <Printer size={16} className="print-icon" />
            Print Receipt
          </button>
        </div>

        {/* Order Number */}
        <div className="order-info-box">
          <p className="order-info-text">
            Order Number: <span className="order-info-bold">{checkoutData.orderNumber || '#ORD-24680'}</span>
          </p>
          <p className="order-info-text">
            A confirmation email has been sent to: <span className="order-info-bold">{checkoutData.customerDetails.email || 'abdurrehmanfaisal@gmail.com'}</span>
          </p>
        </div>

        {/* Shipping Section */}
        <div className="section-container">
          <div className="section-header" onClick={toggleShipping}>
            <div className="section-title">
              <span className="section-number">1</span>
              <h3 className="section-heading">SHIPPING</h3>
            </div>
            {isShippingExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isShippingExpanded && (
            <div className="section-content">
              <div className="grid-container">
                <div className="form-group">
                  <p className="label-details">First Name</p>
                  <p className="value">{checkoutData.customerDetails.firstName || 'Abdur Rehman'}</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Last Name</p>
                  <p className="value">{checkoutData.customerDetails.lastName || 'Faisal'}</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Mobile Number</p>
                  <p className="value">{checkoutData.customerDetails.mobile || '03025233606'}</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Address</p>
                  <p className="value">{checkoutData.customerDetails.address || 'House No 31-C, Street 40, G-6/1-3 Islamabad'}</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Country</p>
                  <p className="value">{checkoutData.customerDetails.country || 'Pakistan'}</p>
                </div>
                <div className="form-group">
                  <p className="label-details">City</p>
                  <p className="value">{checkoutData.customerDetails.city || 'Islamabad'}</p>
                </div>
              </div>

              <div>
                <p className="label-details">Shipping Method</p>
                <p className="value">{orderTotals.shippingMethod || 'International Shipping'} - $ {shipping.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Details Section */}
        <div className="section-container">
          <div className="section-header" onClick={toggleOrderDetails}>
            <div className="section-title">
              <span className="section-number">2</span>
              <h3 className="section-heading">ORDER DETAILS</h3>
            </div>
            {isOrderDetailsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOrderDetailsExpanded && (
            <div className="section-content">
              <div className="grid-container-single">
                <div className="detail-item">
                  <span>Payment Method:</span>
                  <span className="detail-value">{orderTotals.paymentMethod || 'Cash on Delivery'}</span>
                </div>
                <div className="detail-item">
                  <span>Payment Status:</span>
                  <span className="detail-value orange-text">{checkoutData.paymentStatus || 'Pending'}</span>
                </div>
                <div className="detail-item">
                  <span>Order Status:</span>
                  <span className="detail-value green-text">{checkoutData.orderStatus || 'Processing'}</span>
                </div>
                <div className="detail-item">
                  <span>Estimated Delivery:</span>
                  <span className="detail-value">{formatDeliveryDate(checkoutData.estimatedDelivery)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call To Action */}
        <div className="cta-buttons">
          <button className="primary-button" onClick={handleContinueShopping}>
            <Home size={18} className="button-icon" />
            Continue Shopping
          </button>
          <button className="secondary-button">
            Track Order
          </button>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="order-summary-column">
        <h3 className="summary-heading">ORDER SUMMARY</h3>

        {/* Items */}
        <div className="summary-items">
          {orderItems.map((item, index) => (
            <div key={index} className="summary-item">
              <div className="item-image-container">
                <img 
                  src={item.image || defaultProductImage} 
                  alt={item.name} 
                  className="item-image"
                  onError={(e) => {e.target.src = defaultProductImage}} 
                />
              </div>
              <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                {item.size && <div className="item-info">Size: {item.size}</div>}
                <div className="item-info">Qty: {item.quantity}</div>
                <div className="item-price">$ {(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Breakdown */}
        <div className="cost-breakdown">
          <div className="cost-item">
            <span>Subtotal</span>
            <span>$ {subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="cost-item discount-item">
              <span>Discount {orderTotals.appliedVoucher?.code ? `(${orderTotals.appliedVoucher.code})` : ''}</span>
              <span>- $ {discount.toFixed(2)}</span>
            </div>
          )}
          <div className="cost-item">
            <span>Shipping ({orderTotals.shippingMethod || 'International Shipping'})</span>
            <span>$ {shipping.toFixed(2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="total-section">
          <span>Total</span>
          <span>$ {finalTotal.toFixed(2)}</span>
        </div>

        {/* Help Text */}
        <div className="help-text">
          <p>Need help with your order?</p>
          <p className="contact-info">
            Contact our customer support at <span className="contact-value">support@example.com</span> or call{' '}
            <span className="contact-value">+92 300 1234567</span>
          </p>
        </div>
      </div>
    </div>
  );
}