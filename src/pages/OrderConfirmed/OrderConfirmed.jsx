import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Printer, Home } from 'lucide-react';
import coffee from '../../assets/product1.png'; 
import './OrderConfirmed.css'; // Import the CSS file

export default function OrderConfirmed() {
  const [isShippingExpanded, setIsShippingExpanded] = useState(false);
  const [isOrderDetailsExpanded, setIsOrderDetailsExpanded] = useState(false);

  const toggleShipping = () => setIsShippingExpanded(!isShippingExpanded);
  const toggleOrderDetails = () => setIsOrderDetailsExpanded(!isOrderDetailsExpanded);

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
            Order Number: <span className="order-info-bold">#ORD-24680</span>
          </p>
          <p className="order-info-text">
            A confirmation email has been sent to: <span className="order-info-bold">abdurrehmanfaisal@gmail.com</span>
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
                  <p className="value">Abdur Rehman</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Last Name</p>
                  <p className="value">Faisal</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Mobile Number</p>
                  <p className="value">03025233606</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Address</p>
                  <p className="value">House No 31-C, Street 40, G-6/1-3 Islamabad</p>
                </div>
                <div className="form-group">
                  <p className="label-details">Country</p>
                  <p className="value">Pakistan</p>
                </div>
                <div className="form-group">
                  <p className="label-details">City</p>
                  <p className="value">Islamabad</p>
                </div>
              </div>

              <div>
               
                <p className="value">Fixed - PKR 220.00</p>
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
                  <span className="detail-value">Cash on Delivery</span>
                </div>
                <div className="detail-item">
                  <span>Payment Status:</span>
                  <span className="detail-value orange-text">Pending</span>
                </div>
                <div className="detail-item">
                  <span>Order Status:</span>
                  <span className="detail-value green-text">Processing</span>
                </div>
                <div className="detail-item">
                  <span>Estimated Delivery:</span>
                  <span className="detail-value">May 20 - May 24, 2025</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call To Action */}
        <div className="cta-buttons">
          <button className="primary-button">
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
          <div className="summary-item">
            <div className="item-image-container">
              <img src={coffee} alt="Kurta" className="item-image" />
            </div>
            <div className="item-details">
              <h4 className="item-name">Coffee</h4>
              <div className="item-info">Size: 1 lb</div>
              <div className="item-info">Qty: 1</div>
              <div className="item-price">$ 180</div>
            </div>
          </div>

           <div className="summary-item">
            <div className="item-image-container">
              <img src={coffee} alt="Kurta" className="item-image" />
            </div>
            <div className="item-details">
              <h4 className="item-name">Coffee</h4>
              <div className="item-info">Size: 1 lb</div>
              <div className="item-info">Qty: 1</div>
              <div className="item-price">$ 180</div>
            </div>
          </div>
          
          <div className="summary-item">
            <div className="item-image-container">
              <img src={coffee} alt="Pants" className="item-image" />
            </div>
            <div className="item-details">
              <h4 className="item-name">Coffee</h4>
              <div className="item-info">Size: 2 lb</div>
              <div className="item-info">Qty: 2</div>
              <div className="item-price">$ 180</div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="cost-breakdown">
          <div className="cost-item">
            <span>Price incl tax</span>
            <span>$ 260</span>
          </div>
          <div className="cost-item">
            <span>Shipping</span>
            <span>$ 60</span>
          </div>
          <div className="cost-item">
            <span>Sales Tax</span>
            <span>$ 100</span>
          </div>
          <div className="cost-item">
            <span>PSR service charges</span>
            <span>$ 1</span>
          </div>
        </div>

        {/* Total */}
        <div className="total-section">
          <span>Total</span>
          <span>$ 430</span>
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