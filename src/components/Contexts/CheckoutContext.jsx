import { createContext, useContext, useState } from 'react';

// Create context for storing checkout data
const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState({
    customerDetails: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
      country: 'Pakistan',
      region: 'Islamabad Capital Territory',
      city: 'Islamabad',
    },
    orderNumber: '',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    estimatedDelivery: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to update checkout data
  const updateCheckoutData = (data) => {
    setCheckoutData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Function to generate order number and set estimated delivery
  // Function to generate order number and set estimated delivery
  const confirmOrder = () => {
    // Generate random order number
    const orderNumber = '#ORD-' + Math.floor(10000 + Math.random() * 90000);
        
    // Set estimated delivery as days instead of dates
    const estimatedDelivery = "5-9 business days";
        
    updateCheckoutData({
      orderNumber,
      estimatedDelivery,
    });
        
    return { orderNumber, estimatedDelivery };
  };

  // Function to submit order to database
   // In your CheckoutContext.jsx, update the submitOrder function

const submitOrder = async (cartItems, totals) => {
  if (isSubmitting) return;
  
  setIsSubmitting(true);
  
  try {
    // Generate order details
    const { orderNumber, estimatedDelivery } = confirmOrder();
    
    // Prepare customer data for database
    const customerData = {
      name: `${checkoutData.customerDetails.firstName} ${checkoutData.customerDetails.lastName}`,
      email: checkoutData.customerDetails.email,
      phone: checkoutData.customerDetails.mobile,
      address: `${checkoutData.customerDetails.address}`,
    };

    

    // Prepare order data for database
    const orderData = {
      order_number: orderNumber,
      subtotal: totals.subtotal,
      shipping_cost: totals.shipping,
      total_amount: totals.finalTotal,
      payment_method: 'COD',
      status: 'Processing',
      estimated_delivery: estimatedDelivery,
      shipping_method: 'Fixed',
    };

    // Prepare order items data for database
    const orderItemsData = cartItems.map(item => ({
      product_id: item.id || item.product_id, // Use product ID from cart item
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // UPDATE THIS LINE: Change '/orders' to your actual backend URL
    const response = await fetch('http://localhost:5000/orders', { // or your backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: customerData,
        order: orderData,
        items: orderItemsData,
      }),
    });

    if (!response.ok) {
      // Better error handling for non-JSON responses
      let errorMessage = 'Failed to place order';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        // If response isn't JSON, use status text
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Order placed successfully:', result);
    
    return { success: true, orderNumber, estimatedDelivery };
    
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <CheckoutContext.Provider value={{ 
      checkoutData, 
      updateCheckoutData, 
      confirmOrder, 
      submitOrder,
      isSubmitting 
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}