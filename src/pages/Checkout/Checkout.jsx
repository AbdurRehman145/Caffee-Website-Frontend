import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/CartDetails/CartContext';
import { useCheckout } from '../../components/Contexts/CheckoutContext';
import defaultProductImage from '../../assets/product1.png';
import './Checkout.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotals, clearCart } = useCart();
  const { checkoutData, updateCheckoutData, submitOrder, isSubmitting } = useCheckout();
  
  const [openSections, setOpenSections] = useState({
    email: true,
    shipping: true,
    payment: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    email: checkoutData.customerDetails.email || '',
    firstName: checkoutData.customerDetails.firstName || '',
    lastName: checkoutData.customerDetails.lastName || '',
    mobile: checkoutData.customerDetails.mobile || '',
    address: checkoutData.customerDetails.address || '',
    country: checkoutData.customerDetails.country || 'Pakistan',
    region: checkoutData.customerDetails.region || 'Islamabad Capital Territory',
    city: checkoutData.customerDetails.city || 'Islamabad',
  });

  const { subtotal, salesTax, fbrCharges, total } = getCartTotals();
  
  // Fixed shipping cost
  const shipping = 220;
  
  // Calculate final total with shipping
  const finalTotal = total + shipping;

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email format is invalid';
    }
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setFormErrors({});
    setSubmitError('');
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Check if cart is empty
    if (cartItems.length === 0) {
      setSubmitError('Your cart is empty. Please add items before placing an order.');
      return;
    }
    
    try {
      // Update checkout data with form values
      updateCheckoutData({
        customerDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          country: formData.country,
          region: formData.region,
          city: formData.city,
        }
      });
      
      // Prepare totals object
      const totals = {
        subtotal,
        salesTax,
        fbrCharges,
        shipping,
        finalTotal
      };
      
      // Submit order to database
      const result = await submitOrder(cartItems, totals);
      
      if (result.success) {
        // Clear the cart after successful order submission
        clearCart();
        
        // Navigate to order confirmation page
        navigate('/order-confirmed');
      }
      
    } catch (error) {
      console.error('Order submission failed:', error);
      setSubmitError(
        error.message || 'Failed to place order. Please try again.'
      );
    }
  };

  return (
    <div className="checkout-container-checkout">
      <form onSubmit={handleSubmit} className="checkout-form-checkout">
        {submitError && (
          <div className="error-message" style={{ 
            backgroundColor: '#fee', 
            color: '#c33', 
            padding: '10px', 
            marginBottom: '20px', 
            borderRadius: '4px',
            border: '1px solid #fcc'
          }}>
            {submitError}
          </div>
        )}
        
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
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email *" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderColor: formErrors.email ? '#c33' : undefined
                  }}
                />
                {formErrors.email && (
                  <span style={{ color: '#c33', fontSize: '12px' }}>
                    {formErrors.email}
                  </span>
                )}
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
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="First Name *" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      borderColor: formErrors.firstName ? '#c33' : undefined
                    }}
                  />
                  {formErrors.firstName && (
                    <span style={{ color: '#c33', fontSize: '12px' }}>
                      {formErrors.firstName}
                    </span>
                  )}
                </div>
                <div className="input-field-checkout half-width-checkout">
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Last Name *" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      borderColor: formErrors.lastName ? '#c33' : undefined
                    }}
                  />
                  {formErrors.lastName && (
                    <span style={{ color: '#c33', fontSize: '12px' }}>
                      {formErrors.lastName}
                    </span>
                  )}
                </div>
              </div>
              <div className="input-field-checkout">
                <input 
                  type="tel" 
                  id="mobile" 
                  placeholder="Mobile Number *" 
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderColor: formErrors.mobile ? '#c33' : undefined
                  }}
                />
                {formErrors.mobile && (
                  <span style={{ color: '#c33', fontSize: '12px' }}>
                    {formErrors.mobile}
                  </span>
                )}
              </div>
              <div className="input-field-checkout">
                <input 
                  type="text" 
                  id="address" 
                  placeholder="Street Address / House Number *" 
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderColor: formErrors.address ? '#c33' : undefined
                  }}
                />
                {formErrors.address && (
                  <span style={{ color: '#c33', fontSize: '12px' }}>
                    {formErrors.address}
                  </span>
                )}
              </div>
              <div className="input-row-checkout">
                <div className="input-field-checkout half-width-checkout">
                  <select 
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option>Pakistan</option>
                  </select>
                </div>
                <div className="input-field-checkout half-width-checkout">
                  <select 
                    id="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  >
                    <option>Islamabad Capital Territory</option>
                  </select>
                </div>
              </div>
              <div className="input-field-checkout">
                <select 
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  <option>Islamabad</option>
                </select>
              </div>
            </div>

            <h3 className="subsection-title-checkout">SHIPPING METHOD</h3>
            <div className="shipping-method-checkout">
              <input type="radio" id="fixed-shipping" name="shipping-method" checked readOnly />
              <label htmlFor="fixed-shipping">Fixed</label>
              <span className="shipping-price-checkout">$ {shipping.toFixed(2)}</span>
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
              <input type="radio" id="cod" name="payment-method" checked readOnly />
              <label htmlFor="cod">COD</label>
              <svg className="check-icon-checkout" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="payment-note-checkout">PAYMENT WILL BE COLLECTED AT THE TIME OF DELIVERY</span>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="place-order-button-checkout" 
          style={{ 
            margin: '20px auto', 
            display: 'block', 
            width: '100%',
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'PLACING ORDER...' : 'PLACE YOUR ORDER'}
        </button>
      </form>

      <div className="order-summary-checkout">
        <div className="summary-container-checkout">
          <h2 className="summary-title-checkout">Your Bag ({cartItems.length})</h2>
          <div className="product-list-checkout">
            {cartItems.map((item, index) => (
              <div key={index} className="product-item-checkout">
                <img 
                  src={item.image || defaultProductImage} 
                  alt={item.name} 
                  className="product-image-checkout"
                  onError={(e) => {e.target.src = defaultProductImage}}
                />
                <div className="product-details-checkout">
                  <h3 className="product-name-checkout">{item.name}</h3>
                  <p className="product-price-checkout">$ {item.price.toFixed(2)}</p>
                  <div className="product-meta-checkout">
                    {item.size && <span className="product-size-checkout">Size: {item.size}</span>}
                    <span className="product-quantity-checkout">Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="voucher-section-checkout">
            <h3 className="voucher-title-checkout">REDEEM YOUR VOUCHER</h3>
            <div className="voucher-input-checkout">
              <input type="text" placeholder="Enter Code" />
              <button type="button" className="apply-button-checkout">APPLY</button>
            </div>
          </div>

          <div className="price-details-checkout">
            <h3 className="price-title-checkout">ORDER SUMMARY</h3>
            <div className="price-list-checkout">
              <div className="price-item-checkout"><span>Price incl. tax</span><span>$ {subtotal.toFixed(2)}</span></div>
              <div className="price-item-checkout"><span>Shipping</span><span>$ {shipping.toFixed(2)}</span></div>
              <div className="price-item-checkout"><span>Sales Tax</span><span>$ {salesTax.toFixed(2)}</span></div>
              <div className="price-item-checkout"><span>FBR service charges</span><span>$ {fbrCharges.toFixed(2)}</span></div>
              <div className="price-total-checkout"><span>Total</span><span>$ {finalTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}