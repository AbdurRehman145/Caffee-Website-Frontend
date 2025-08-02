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
    orderTotals: null,
    orderItems: []
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
  const confirmOrder = () => {
    // Generate random order number
    const orderNumber = '#ORD-' + Math.floor(10000 + Math.random() * 90000);
        
    const today = new Date();
    const deliveryDate = new Date(today);
    
    // Add 7 business days (skipping weekends)
    let businessDaysAdded = 0;
    while (businessDaysAdded < 7) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // Check if it's a weekday (Monday = 1, Friday = 5)
      if (deliveryDate.getDay() >= 1 && deliveryDate.getDay() <= 5) {
        businessDaysAdded++;
      }
    }
    
    // Format as date-only string (YYYY-MM-DD) to avoid time zone issues
    const estimatedDelivery = deliveryDate.toISOString().split('T')[0];
        
    updateCheckoutData({
      orderNumber,
      estimatedDelivery,
    });
        
    return { orderNumber, estimatedDelivery };
  };

  // Function to submit order to database

const submitOrder = async (cartItems, totals, customerDetails) => {
  if (isSubmitting) return;
  
  setIsSubmitting(true);
  
  try {
    // Generate order details
  const { orderNumber, estimatedDelivery } = confirmOrder();

    // Store order totals and items in checkout data
  updateCheckoutData({
    orderTotals: totals,
    orderItems: cartItems
  });

    // Prepare customer data for database
  const customerData = {
    name: `${customerDetails.firstName} ${customerDetails.lastName}`,
    email: customerDetails.email,
    phone: customerDetails.mobile,
    address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.country}`,
  };

    

    // Prepare order data for database
    const orderData = {
      order_number: orderNumber,
      subtotal: totals.subtotal,
      shipping_cost: totals.shipping,
      total_amount: totals.finalTotal,
      payment_method: totals.paymentMethod || 'COD',
      status: 'Processing',
      estimated_delivery: estimatedDelivery,
      shipping_method: totals.shippingMethod || 'International Shipping',
    };

    // Prepare order items data for database
    const orderItemsData = cartItems.map(item => ({
      product_id: item.id || item.product_id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    
    const response = await fetch('http://localhost:5000/orders', { 
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