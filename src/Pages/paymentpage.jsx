import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

export default function PaymentPage() {
  const location = useLocation();
  const { bookingId, totalPrice } = location.state || {};

  // If coming from booking page, use state; else fallback to dummy data
  const initialBookingData = location.state
    ? {
        room: {
          type: location.state.roomTypeLabel,
          price: location.state.roomRate,
        },
        checkIn: location.state.checkIn,
        checkOut: location.state.checkOut,
        guestName: location.state.fullName,
        guestEmail: location.state.email,
        guestPhone: location.state.phone,
        adultCount: location.state.guests,
        childrenCount: 0, // You can add children field if needed
        addonsSelected: location.state.addonsSelected || [],
        specialRequests: location.state.specialRequests,
        nights:
          location.state.checkIn && location.state.checkOut
            ? Math.ceil(
                (new Date(location.state.checkOut) -
                  new Date(location.state.checkIn)) /
                  (1000 * 60 * 60 * 24)
              )
            : 1,
      }
    : {
        // fallback dummy data
        room: { id: 1, type: "Suite Room", price: 5000 },
        checkIn: "2025-06-01",
        checkOut: "2025-06-03",
        guestName: "John Doe",
        guestEmail: "john.doe@example.com",
        guestPhone: "+91 9876543210",
        adultCount: 2,
        childrenCount: 1,
        addonsSelected: ["Airport Transfer", "Breakfast"],
        specialRequests: "Late checkout if possible",
        nights: 2,
      };

  // Calculate total amount
  const addonPrices = {
    "Airport Transfer": 500,
    "Extra Bed": 1000,
    "Late Checkout": 500,
    "Early Checkin": 500,
    Breakfast: 300,
    "Spa Services": 2000,
    "Room Service": 800,
    "Laundry Service": 400,
  };

  const calcTotal = (data) => {
    const roomTotal = data.room.price * data.nights;
    const addonsTotal = (data.addonsSelected || []).reduce(
      (sum, addon) => sum + (addonPrices[addon] || 0),
      0
    );
    return roomTotal + addonsTotal;
  };

  const [bookingData, setBookingData] = useState({
    ...initialBookingData,
    totalAmount: calcTotal(initialBookingData),
  });

  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, processing, success, failed
  const [paymentId, setPaymentId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Generate order ID on component mount
    generateOrderId();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const generateOrderId = () => {
    // In real implementation, this would be an API call to your backend
    const mockOrderId = "order_" + Math.random().toString(36).substr(2, 9);
    setOrderId(mockOrderId);
  };

  const calculateNights = () => {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_1234567890", // Replace with your Razorpay Key ID
      amount: bookingData.totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Enkeys Residency",
      description: `Room Booking - ${bookingData.room.type}`,
      image: "https://your-logo-url.com/logo.png", // Replace with your logo URL
      order_id: orderId,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: bookingData.guestName,
        email: bookingData.guestEmail,
        contact: bookingData.guestPhone,
      },
      notes: {
        room_type: bookingData.room.type,
        check_in: bookingData.checkIn,
        check_out: bookingData.checkOut,
        guests: `${bookingData.adultCount} Adults, ${bookingData.childrenCount} Children`,
      },
      theme: {
        color: "#007bff",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
          setPaymentStatus("pending");
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      handlePaymentFailure(response);
    });

    setPaymentStatus("processing");
    rzp.open();
  };

  const handlePaymentSuccess = async (response) => {
    setPaymentId(response.razorpay_payment_id);
    setPaymentStatus("success");
    setLoading(false);

    // In real implementation, verify payment on backend
    try {
      const verificationData = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        booking_data: bookingData,
      };

      // Replace with your verification endpoint
      // const verifyResponse = await fetch('/api/verify-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(verificationData)
      // });

      console.log("Payment verification data:", verificationData);

      // Mock successful verification
      setTimeout(() => {
        alert(
          "Booking confirmed! You will receive a confirmation email shortly."
        );
      }, 1000);
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus("failed");
    }
  };

  const handlePaymentFailure = (response) => {
    setPaymentStatus("failed");
    setLoading(false);
    console.error("Payment failed:", response.error);
  };

  const goBack = () => {
    setPaymentStatus("pending");
    setPaymentId(null);
  };

  if (paymentStatus === "success") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <CheckCircle
            style={{
              width: "80px",
              height: "80px",
              color: "#10b981",
              margin: "0 auto 20px",
            }}
          />
          <h2
            style={{ color: "#1f2937", marginBottom: "16px", fontSize: "28px" }}
          >
            Payment Successful!
          </h2>
          <p
            style={{ color: "#6b7280", marginBottom: "24px", fontSize: "16px" }}
          >
            Your booking has been confirmed. Payment ID:{" "}
            <strong>{paymentId}</strong>
          </p>
          <div
            style={{
              background: "#f9fafb",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            <h4 style={{ color: "#1f2937", marginBottom: "12px" }}>
              Booking Details:
            </h4>
            <p>
              <strong>Room:</strong> {bookingData.room.type}
            </p>
            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(bookingData.checkIn).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(bookingData.checkOut).toLocaleDateString()}
            </p>
            <p>
              <strong>Guests:</strong> {bookingData.adultCount} Adults,{" "}
              {bookingData.childrenCount} Children
            </p>
            <p>
              <strong>Total Paid:</strong> ₹
              {bookingData.totalAmount.toLocaleString()}
            </p>
          </div>
          <p
            style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}
          >
            A confirmation email has been sent to {bookingData.guestEmail}
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <XCircle
            style={{
              width: "80px",
              height: "80px",
              color: "#ef4444",
              margin: "0 auto 20px",
            }}
          />
          <h2
            style={{ color: "#1f2937", marginBottom: "16px", fontSize: "28px" }}
          >
            Payment Failed
          </h2>
          <p
            style={{ color: "#6b7280", marginBottom: "24px", fontSize: "16px" }}
          >
            Your payment could not be processed. Please try again or contact
            support.
          </p>
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              onClick={goBack}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => (window.location.href = "/contact")}
              style={{
                background: "transparent",
                color: "#007bff",
                border: "2px solid #007bff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <header
        style={{
          background: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => window.history.back()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                color: "#6b7280",
              }}
            >
              <ArrowLeft style={{ width: "20px", height: "20px" }} />
            </button>
            <div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                ENKEYS
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Residency
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6b7280",
            }}
          >
            <Shield style={{ width: "16px", height: "16px" }} />
            <span style={{ fontSize: "14px" }}>Secure Payment</span>
          </div>
        </div>
      </header>

      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Booking Summary */}
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "20px",
                }}
              >
                Booking Summary
              </h3>

              <div style={{ marginBottom: "20px" }}>
                <h4
                  style={{
                    fontSize: "18px",
                    color: "#1f2937",
                    marginBottom: "8px",
                  }}
                >
                  {bookingData.room.type}
                </h4>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>
                  {calculateNights()} night{calculateNights() > 1 ? "s" : ""} •
                  ₹{bookingData.room.price}/night
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <Calendar
                    style={{ width: "16px", height: "16px", color: "#6b7280" }}
                  />
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    {new Date(bookingData.checkIn).toLocaleDateString()} -{" "}
                    {new Date(bookingData.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Users
                    style={{ width: "16px", height: "16px", color: "#6b7280" }}
                  />
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    {bookingData.adultCount} Adult
                    {bookingData.adultCount > 1 ? "s" : ""},{" "}
                    {bookingData.childrenCount} Child
                    {bookingData.childrenCount !== 1 ? "ren" : ""}
                  </span>
                </div>
              </div>

              {/* Guest Information */}
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "16px",
                  marginBottom: "16px",
                }}
              >
                <h5
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "8px",
                  }}
                >
                  Guest Information
                </h5>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  {bookingData.guestName}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "4px",
                  }}
                >
                  {bookingData.guestEmail}
                </p>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>
                  {bookingData.guestPhone}
                </p>
              </div>

              {/* Add-ons */}
              {bookingData.addonsSelected.length > 0 && (
                <div
                  style={{
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "8px",
                    }}
                  >
                    Add-ons & Services
                  </h5>
                  {bookingData.addonsSelected.map((addon) => (
                    <div
                      key={addon}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {addon}
                      </span>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>
                        ₹{addonPrices[addon]}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div
                style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    Room ({calculateNights()} night
                    {calculateNights() > 1 ? "s" : ""})
                  </span>
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    ₹
                    {(
                      bookingData.room.price * calculateNights()
                    ).toLocaleString()}
                  </span>
                </div>

                {bookingData.addonsSelected.map((addon) => (
                  <div
                    key={addon}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#374151" }}>
                      {addon}
                    </span>
                    <span style={{ fontSize: "14px", color: "#374151" }}>
                      ₹{addonPrices[addon]}
                    </span>
                  </div>
                ))}

                <div
                  style={{
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "8px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#007bff",
                      }}
                    >
                     ₹{totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "16px",
                }}
              >
                Payment Details
              </h3>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <CreditCard
                    style={{ width: "20px", height: "20px", color: "#007bff" }}
                  />
                  <span style={{ fontWeight: "600", color: "#1f2937" }}>
                    Pay with Razorpay
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "0",
                  }}
                >
                  Secure payment powered by Razorpay. We accept all major credit
                  cards, debit cards, net banking, and UPI.
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ fontSize: "16px", color: "#374151" }}>
                    Amount to Pay
                  </span>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#007bff",
                    }}
                  >
                    ₹{bookingData.totalAmount.toLocaleString()}
                  </span>
                </div>

                {orderId && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "16px",
                    }}
                  >
                    Order ID: {orderId}
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  window.open(
                    "https://razorpay.com/payment-link/plink_QZq53mRYbLr6O7",
                    "_blank"
                  )
                }
                disabled={loading || paymentStatus === "processing"}
                style={{
                  width: "100%",
                  background:
                    loading || paymentStatus === "processing"
                      ? "#9ca3af"
                      : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "16px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor:
                    loading || paymentStatus === "processing"
                      ? "not-allowed"
                      : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s",
                }}
              >
                {paymentStatus === "processing" ? (
                  <>
                    <Clock
                      style={{
                        width: "20px",
                        height: "20px",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard style={{ width: "20px", height: "20px" }} />
                    Pay Now
                  </>
                )}
              </button>

              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  background: "#f0f8ff",
                  borderRadius: "8px",
                  border: "1px solid #e0f2fe",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <Shield
                    style={{ width: "16px", height: "16px", color: "#007bff" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1f2937",
                    }}
                  >
                    Secure Payment
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: "0" }}>
                  Your payment information is encrypted and secure. We don't
                  store your card details.
                </p>
              </div>
            </div>

            {/* Contact Support */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "12px",
                }}
              >
                Need Help?
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Phone
                    style={{ width: "14px", height: "14px", color: "#6b7280" }}
                  />
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    + 0477 225 8462
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Mail
                    style={{ width: "14px", height: "14px", color: "#6b7280" }}
                  />
                  <span style={{ fontSize: "14px", color: "#374151" }}>
                    enkeysresidency@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}