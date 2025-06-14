// PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { propertyName } = useParams();
  const { bookingId, amount } = state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const decodedPropertyName = decodeURIComponent(propertyName || "");

  useEffect(() => {
    if (!bookingId || !amount) {
      toast.error('Invalid payment data. Please try again.');
      navigate('/booking'); // Redirect back to booking page
      return;
    }

    initiatePayment();
  }, [bookingId, amount]);

  const initiatePayment = async () => {
    try {
      setLoading(true);
      
      // Step 1: Create order on backend
      const orderResponse = await axios.post('http://192.168.1.19:8080/api/payment/create-order', {
        amount: amount,
        currency: 'INR',
        bookingId: bookingId
      });

      const { orderId, amount: orderAmount, currency } = orderResponse.data;

      // Step 2: Initialize Razorpay with the created order
      const options = {
        key: 'rzp_test_fHtKZiyPdgNbCk',
        amount: orderAmount, // This comes from the created order
        currency: currency,
        name: 'Resto',
        description: 'Booking Payment',
        order_id: orderId, // Use the Razorpay order ID
        handler: async function (response) {
          // Handle successful payment
          console.log('Payment Success:', response);
          
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post('http://192.168.1.19:8080/api/payment/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            console.log('Payment verified:', verifyResponse.data);
            toast.success('Payment successful!');
            
            // Redirect to success page
            navigate('/payment-success', { 
              state: { 
                bookingId: bookingId, 
                paymentId: response.razorpay_payment_id 
              } 
            });
          } catch (verifyError) {
            console.error('Payment verification failed:', verifyError);
            toast.error('Payment completed but verification failed. Please contact support.');
            navigate('/payment-failed', { state: { bookingId } });
          }
        },
        prefill: {
          name: '', // You can get this from user context/state
          email: '',
          contact: '',
        },
        theme: {
          color: '#F37254',
        },
        modal: {
          ondismiss: function() {
            // Handle when user closes the payment modal
            console.log('Payment modal closed');
            toast.info('Payment cancelled');
            navigate('/booking'); // Redirect back to booking
          }
        }
      };

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        navigate('/payment-failed', { state: { bookingId, error: response.error } });
      });

      rzp.open();
      setLoading(false);

    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
      setError(true);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(false);
    initiatePayment();
  };

 

  if (loading) {
    return (
      <div className="payment-page">
        <div className="loading-container">
          <h2>Preparing Payment...</h2>
          <div className="spinner"></div>
          <p>Please wait while we set up your payment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-page">
        <div className="error-container">
          <h2>Payment Error</h2>
          <p>There was an error setting up your payment. Please try again.</p>
          <div className="error-actions">
            <button onClick={handleRetry} className="btn btn-primary">
              Try Again
            </button>
            <button className="btn btn-secondary">
              Go Back to Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Processing Payment...</h2>
        <p>If the payment window doesn't open, please ensure pop-ups are enabled.</p>
        <button onClick={handleGoBack} className="btn btn-secondary">
          Cancel Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;