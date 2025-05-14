import { useState } from 'react';
import coffee from '../../assets/product1.png';
import './Checkout.css';

export default function CheckoutPage() {
  const [openSections, setOpenSections] = useState({
    email: true,
    shipping: true,
    payment: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const products = [
    {
      name: 'Coffee',
      price: 180,
      size: '1 lb',
      quantity: 1,
      image: coffee
    },
    {
      name: 'Coffee',
      price: 180,
      size: '2 lb',
      quantity: 1,
      image: coffee
    }
  ];

  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const shipping = 220;
  const serviceFee = 1;
  const taxRate = 0.075;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + serviceFee + tax;

  return (
    <div className="checkout-container-checkout">
      <div className="checkout-form-checkout">
        <div className="checkout-section-checkout">
          <div className="section-header-checkout" onClick={() => toggleSection('email')}>
            <div className="step-number-checkout">1</div>
            <h2>ENTER EMAIL</h2>
            <div className={`chevron-checkout ${openSections.email ? 'up' : 'down'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>
          <div className={`section-content-checkout ${openSections.email ? 'open' : 'closed'}`}>
            <div className="email-field-checkout">
              <p className="signin-text-checkout">
                Already have an account? <a href="#" className="signin-link-checkout">SIGN IN</a>
              </p>
              <div className="input-field-checkout">
                <label htmlFor="email" className="sr-only-checkout">Email</label>
                <input type="email" id="email" placeholder="Email *" />
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-section-checkout">
          <div className="section-header-checkout" onClick={() => toggleSection('shipping')}>
            <div className="step-number-checkout">2</div>
            <h2>SHIPPING</h2>
            <div className={`chevron-checkout ${openSections.shipping ? 'up' : 'down'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>
          <div className={`section-content-checkout ${openSections.shipping ? 'open' : 'closed'}`}>
            <h3 className="subsection-title-checkout">CUSTOMER DETAILS</h3>
            <div className="customer-details-checkout">
              <div className="input-row-checkout">
                <div className="input-field-checkout half-width-checkout">
                  <input type="text" placeholder="First Name *" />
                </div>
                <div className="input-field-checkout half-width-checkout">
                  <input type="text" placeholder="Last Name *" />
                </div>
              </div>
              <div className="input-field-checkout">
                <input type="tel" placeholder="Mobile Number *" />
              </div>
              <div className="input-field-checkout">
                <input type="text" placeholder="Street Address / House Number *" />
              </div>
              <div className="input-row-checkout">
                <div className="input-field-checkout half-width-checkout">
                  <select><option>Pakistan</option></select>
                </div>
                <div className="input-field-checkout half-width-checkout">
                  <select><option>Islamabad Capital Territory</option></select>
                </div>
              </div>
              <div className="input-field-checkout">
                <select><option>Islamabad</option></select>
              </div>
            </div>

            <h3 className="subsection-title-checkout">SHIPPING METHOD</h3>
            <div className="shipping-method-checkout">
              <input type="radio" id="fixed-shipping" name="shipping-method" checked />
              <label htmlFor="fixed-shipping">Fixed</label>
              <span className="shipping-price-checkout">$ 220.00</span>
            </div>
          </div>
        </div>

        <div className="checkout-section-checkout">
          <div className="section-header-checkout" onClick={() => toggleSection('payment')}>
            <div className="step-number-checkout">3</div>
            <h2>PAYMENT</h2>
            <div className={`chevron-checkout ${openSections.payment ? 'up' : 'down'}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>
          <div className={`section-content-checkout ${openSections.payment ? 'open' : 'closed'}`}>
            <div className="payment-method-checkout">
              <input type="radio" id="cod" name="payment-method" checked />
              <label htmlFor="cod">COD</label>
              <svg className="check-icon-checkout" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="payment-note-checkout">PAYMENT WILL BE COLLECTED AT THE TIME OF DELIVERY</span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-summary-checkout">
        <div className="summary-container-checkout">
          <h2 className="summary-title-checkout">Your Bag (2)</h2>
          <div className="product-list-checkout">
            {products.map((product, index) => (
              <div key={index} className="product-item-checkout">
                <img src={product.image} alt={product.name} className="product-image-checkout" />
                <div className="product-details-checkout">
                  <h3 className="product-name-checkout">{product.name}</h3>
                  <p className="product-price-checkout">$ {product.price.toLocaleString()}</p>
                  <div className="product-meta-checkout">
                    <span className="product-size-checkout">Size: {product.size}</span>
                    <span className="product-quantity-checkout">Qty: {product.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="voucher-section-checkout">
            <h3 className="voucher-title-checkout">REDEEM YOUR VOUCHER</h3>
            <div className="voucher-input-checkout">
              <input type="text" placeholder="Enter Code" />
              <button className="apply-button-checkout">APPLY</button>
            </div>
          </div>

          <div className="price-details-checkout">
            <h3 className="price-title-checkout">ORDER SUMMARY</h3>
            <div className="price-list-checkout">
              <div className="price-item-checkout"><span>Price incl. tax</span><span>$ {subtotal.toLocaleString()}</span></div>
              <div className="price-item-checkout"><span>Shipping</span><span>$ {shipping.toLocaleString()}</span></div>
              <div className="price-item-checkout"><span>Sales Tax</span><span>$ {tax.toFixed(0)}</span></div>
              <div className="price-item-checkout"><span>PSR service charges</span><span>$ {serviceFee}</span></div>
              <div className="price-total-checkout"><span>Total</span><span>$ {total.toFixed(0)}</span></div>
            </div>
          </div>

          <button className="place-order-button-checkout">PLACE YOUR ORDER</button>
        </div>
      </div>
    </div>
  );
}
