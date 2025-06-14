import React, { useState, useEffect } from "react";
import { Calendar, Users, MapPin, Phone, Mail } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/landingpage.css";

export default function BookingPage() {
  const navigate = useNavigate();
  const { propertyName } = useParams(); // Extract property name from URL
  const { state } = useLocation(); // Get state from navigation (room details)
  const decodedPropertyName = decodeURIComponent(propertyName || "");

  const [formData, setFormData] = useState({
    roomTypeId: state?.room?.id || "",
    guests: 2,
    checkIn: "",
    checkOut: "",
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    addonsSelected: [],
  });

  const [addons, setAddons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  // Debug logging function
  const debugLog = (message, data = null) => {
    console.log(`[BookingPage Debug] ${message}`, data ? data : "");
  };

  // Fetch add-ons on mount
  useEffect(() => {
    const fetchAddons = async () => {
      if (!decodedPropertyName) {
        debugLog("No property name provided in URL");
        setError("Property name is required");
        setIsFetching(false);
        return;
      }

      debugLog("Starting add-ons fetch for property:", decodedPropertyName);
      setIsFetching(true);
      setError(null);

      try {
        debugLog("Making add-ons API call...");
        const addonsResponse = await axios.get(
          `http://192.168.1.19:8080/api/addons/get-addon?propertyName=${encodeURIComponent(
            decodedPropertyName
          )}`,
          {
            // timeout: 15000,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        debugLog("Addons data:", addonsResponse.data);
        if (Array.isArray(addonsResponse.data)) {
          setAddons(addonsResponse.data);
        } else {
          debugLog("Addons response is not an array:", addonsResponse.data);
          setAddons([]);
        }
      } catch (err) {
        debugLog("Addons API failed:", err);
        const addonError = err;
        let errorMessage =
          "Failed to load add-ons. Some features may be unavailable.";
        if (addonError.code === "ECONNABORTED") {
          errorMessage =
            "Addons request timed out. Some features may be unavailable.";
        } else if (addonError.response?.status === 403) {
          errorMessage =
            "Access denied to addons. Some features may be unavailable.";
        }
        toast.warn(errorMessage);
        setAddons([]);
      } finally {
        setIsFetching(false);
        debugLog("Add-ons fetch completed for property:", decodedPropertyName);
      }
    };

    // Validate room data from navigation state
    if (!state?.room?.id) {
      debugLog("No room data provided in navigation state");
      setError("No room selected. Please select a room first.");
      setIsFetching(false);
      return;
    }

    fetchAddons();
  }, [decodedPropertyName, state]);

  // Add error handling for missing property name or room data
  if (!propertyName || !state?.room?.id) {
    return (
      <div className="error-container">
        <h2>Invalid Selection</h2>
        <p>
          {!propertyName ? "No property name provided." : "No room selected."}{" "}
          Please select a property and room first.
        </p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    const roomPrice = state?.room?.pricePerNight
      ? Number(state.room.pricePerNight)
      : 0;
    let nights = 1;
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const diffTime = checkOutDate - checkInDate;
      nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    const addonsTotal = formData.addonsSelected.reduce((sum, addonName) => {
      const addon = addons.find((a) => a.name === addonName);
      return sum + (addon?.price ? Number(addon.price) : 0);
    }, 0);

    return roomPrice * nights + addonsTotal;
  };

  // Validate form inputs
  // Validate form inputs
  const validateForm = () => {
    debugLog("Validating form with data:", formData);
    const errors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.roomTypeId) {
      errors.roomTypeId = "Room type is required";
    }

    if (!formData.checkIn) {
      errors.checkIn = "Check-in date is required";
    } else if (formData.checkIn < today) {
      errors.checkIn = "Check-in cannot be in the past";
    }

    if (!formData.checkOut) {
      errors.checkOut = "Check-out date is required";
    } else if (formData.checkOut <= formData.checkIn) {
      errors.checkOut = "Check-out must be after check-in";
    }

    if (!formData.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email.trim()
      )
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9\-\+\s\(\)]+$/.test(formData.phone.trim())) {
      errors.phone = "Invalid phone number format";
    }

    const guestsNum = parseInt(formData.guests);
    // Update the validation condition to allow up to 10 guests
    if (!guestsNum || guestsNum < 1 || guestsNum > 10) {
      errors.guests = `Number of guests must be between 1 and 10`;
    }

    debugLog("Form validation errors:", errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    debugLog(`Input change - ${name}:`, value);

    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddonToggle = (addonName) => {
    debugLog("Toggling addon:", addonName);
    setFormData((prev) => {
      const newAddons = prev.addonsSelected.includes(addonName)
        ? prev.addonsSelected.filter((a) => a !== addonName)
        : [...prev.addonsSelected, addonName];
      return { ...prev, addonsSelected: newAddons };
    });
  };

 // 1. Update the handleSubmit function

const handleSubmit = async (e) => {
  e.preventDefault();
  debugLog('Form submission started');
  setError(null);

  if (!validateForm()) {
    debugLog('Form validation failed');
    toast.error('Please fix the form errors before submitting');
    return;
  }

  setLoading(true);
  debugLog('Form validation passed, preparing booking data...');

  // Calculate total amount on frontend (to display to user)
  const totalAmount = calculateTotalPrice();

  const bookingData = {
    // Required fields from your BookingDto
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    guests: parseInt(formData.guests),
    checkIn: formData.checkIn,
    checkOut: formData.checkOut,
    totalAmount: totalAmount, // Backend expects BigDecimal
    paymentStatus: 'PENDING', // Initial status
    addonsSelected: formData.addonsSelected,
    specialRequests: formData.specialRequests?.trim() || '',
    
    // Property and room details
    propertyId: state?.room?.propertyId,
    propertyName: decodedPropertyName,
    roomTypeId: parseInt(formData.roomTypeId),
    roomTypeName: state?.room?.roomTypeName,
    roomId: state?.room?.id,
    
    // Auto-generated fields (these will be set by backend, but including for completeness)
    createdDate: new Date().toISOString().split('T')[0], // Current date
    createdTime: new Date().toTimeString().split(' ')[0], // Current time
  };

  debugLog('Booking data object:', bookingData);

  try {
    debugLog('Sending booking request...');
    // Use relative path instead of full URL
    const response = await axios.post('http://192.168.1.19:8080/api/bookings/create-booking', bookingData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    debugLog('Booking response received:', response.data);
    
    if (response.data && response.data.id) {
      // Use the Long ID (response.data.id) not the string bookingId
      const bookingId = response.data.id; // This is the Long ID that backend expects
      const bookingReference = response.data.bookingId; // This is the string reference for display
      const totalAmount = response.data.totalAmount;
      
      toast.success(`Booking successful! Booking ID: ${bookingReference}`);
      debugLog('Navigating to payment page with booking ID:', bookingId);
      
      // Pass the Long ID to payment page
      navigate('/payment', { 
        state: { 
          bookingId: bookingId, // Long ID for backend API calls
          amount: totalAmount,
          bookingReference: bookingReference // String reference for display
        } 
      });
    } else {
      throw new Error('Invalid response from server');
    }
    
  } catch (err) {
    debugLog('Booking submission error details:', err);
    let errorMessage = 'Failed to create booking. Please try again.';
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 400) {
      errorMessage = 'Invalid booking data. Please check your inputs.';
    } else if (err.response?.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else if (err.code === 'ERR_NETWORK') {
      errorMessage = 'Network error. Please check your connection and try again.';
    }
    
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setLoading(false);
    debugLog('Booking submission completed');
  }
};

  if (isFetching) {
    debugLog("Rendering loading state");
    return (
      <div className="booking-page">
        <div
          className="main-content"
          style={{ textAlign: "center", padding: "50px" }}
        >
          <h2>Loading booking options for {decodedPropertyName}...</h2>
          <p>Please wait while we fetch the latest services.</p>
        </div>
      </div>
    );
  }

  debugLog("Rendering main booking form");

  return (
    <div className="booking-page">
      <ToastContainer position="top-right" autoClose={5000} />

      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="logo-container">
              <div className="logo">
                <div className="logo-main">ENKEYS</div>
                <div className="logo-sub">Residency</div>
              </div>
            </div>
            <nav className="nav">
              <a href="#" onClick={(e) => e.preventDefault()}>
                HOME
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                ROOMS
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                TARIFF
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                GALLERY
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                FACILITIES
              </a>
              <a
                href="#"
                className="contact-btn"
                onClick={(e) => e.preventDefault()}
              >
                CONTACT US
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Book Your Stay</h1>
          <p>Experience luxury and comfort at Enkeys Residency</p>
        </div>
      </div>

      <div className="main-content">
        <div className="booking-card">
          <div className="card-header">
            <h2>Make a Reservation</h2>
            <p>Fill in the details below to book your perfect stay</p>
          </div>

          <div className="card-body">
            {error && (
              <div
                className="error-message"
                style={{
                  backgroundColor: "#fee",
                  border: "1px solid #fcc",
                  color: "#c00",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Room Type Display */}
                <div className="form-group">
                  <label className="form-label">Selected Room Type</label>
                  <div
                    className="form-input"
                    style={{
                      padding: "10px",
                      background: "#f8f9fa",
                      borderRadius: "4px",
                    }}
                  >
                    {state?.room?.roomTypeName} - ₹
                    {state?.room?.pricePerNight?.toLocaleString()}/night
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="form-group">
                  <label className="form-label">
                    <Users className="icon" />
                    Number of Guests *
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className={`form-select ${
                      formErrors.guests ? "error" : ""
                    }`}
                    required
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1} Guest{num + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  {formErrors.guests && (
                    <span className="error-text">{formErrors.guests}</span>
                  )}
                </div>

                {/* Check-in Date */}
                <div className="form-group">
                  <label className="form-label">
                    <Calendar className="icon" />
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`form-input ${
                      formErrors.checkIn ? "error" : ""
                    }`}
                    required
                  />
                  {formErrors.checkIn && (
                    <span className="error-text">{formErrors.checkIn}</span>
                  )}
                </div>

                {/* Check-out Date */}
                <div className="form-group">
                  <label className="form-label">
                    <Calendar className="icon" />
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={
                      formData.checkIn || new Date().toISOString().split("T")[0]
                    }
                    className={`form-input ${
                      formErrors.checkOut ? "error" : ""
                    }`}
                    required
                  />
                  {formErrors.checkOut && (
                    <span className="error-text">{formErrors.checkOut}</span>
                  )}
                </div>
              </div>

              <div className="section-divider">
                <h3 className="section-title">Guest Information</h3>
                <div className="guest-info-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`form-input ${
                        formErrors.fullName ? "error" : ""
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {formErrors.fullName && (
                      <span className="error-text">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Mail className="icon" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${
                        formErrors.email ? "error" : ""
                      }`}
                      placeholder="Enter your email address"
                      required
                    />
                    {formErrors.email && (
                      <span className="error-text">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Phone className="icon" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${
                        formErrors.phone ? "error" : ""
                      }`}
                      placeholder="Enter your phone number"
                      required
                    />
                    {formErrors.phone && (
                      <span className="error-text">{formErrors.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="section-divider">
                <h3 className="section-title">Add-ons & Services</h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  {addons.length === 0 ? (
                    <span style={{ color: "#666", fontStyle: "italic" }}>
                      No add-ons available
                    </span>
                  ) : (
                    addons.map((addon) => (
                      <label
                        key={addon.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                          padding: "12px",
                          border: "1px solid #e0e0e0",
                          borderRadius: "6px",
                          background: formData.addonsSelected.includes(
                            addon.name
                          )
                            ? "#f0f8ff"
                            : "white",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.addonsSelected.includes(addon.name)}
                          onChange={() => handleAddonToggle(addon.name)}
                          style={{ margin: 0 }}
                        />
                        <span style={{ fontSize: "14px", flex: 1 }}>
                          {addon.name}
                        </span>
                        <span style={{ fontWeight: 500, color: "#007bff" }}>
                          ₹{addon.price}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="special-requests">
                <label className="form-label">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Any special requirements or requests (dietary restrictions, accessibility needs, etc.)"
                  rows="4"
                />
              </div>

              <div
                className="booking-summary"
                style={{
                  background: "#f8f9fa",
                  padding: "20px",
                  borderRadius: "8px",
                  marginTop: "20px",
                }}
              >
                <h3 className="summary-title">Booking Summary</h3>
                <div className="summary-items">
                  <div className="summary-item">
                    <span>Room Type:</span>
                    <span className="summary-value">
                      {state?.room?.roomTypeName || "N/A"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Guests:</span>
                    <span className="summary-value">
                      {formData.guests} Guest{formData.guests > 1 ? "s" : ""}
                    </span>
                  </div>
                  {formData.checkIn && (
                    <div className="summary-item">
                      <span>Check-in:</span>
                      <span className="summary-value">
                        {new Date(formData.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {formData.checkOut && (
                    <div className="summary-item">
                      <span>Check-out:</span>
                      <span className="summary-value">
                        {new Date(formData.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {formData.addonsSelected.length > 0 && (
                    <div className="summary-item">
                      <span>Add-ons:</span>
                      <span className="summary-value">
                        {formData.addonsSelected.map((addon, index) => (
                          <span key={addon}>
                            {addon} (₹
                            {addons.find((a) => a.name === addon)?.price ||
                              "N/A"}
                            )
                            {index < formData.addonsSelected.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading || isFetching}
                style={{
                  width: "100%",
                  padding: "15px",
                  marginTop: "20px",
                  backgroundColor: loading || isFetching ? "#ccc" : "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: loading || isFetching ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s ease",
                }}
              >
                {loading
                  ? "Processing..."
                  : `Book Now (₹${calculateTotalPrice()})`}
              </button>

              <p
                className="disclaimer"
                style={{
                  fontSize: "12px",
                  color: "#666",
                  textAlign: "center",
                  marginTop: "15px",
                }}
              >
                By booking, you agree to our terms and conditions. You will
                receive a confirmation email shortly.
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <h3 className="contact-title">Need Help with Your Booking?</h3>
            <p className="contact-subtitle">
              Our team is here to assist you 24/7
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+ 0477 225 8462</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>enkeysresidency@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Pathirappaly, Alappuzha 688521</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
