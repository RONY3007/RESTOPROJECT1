import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/landingpage.css';

export default function BookingPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomTypeId: '',
    guests: 2,
    checkIn: '',
    checkOut: '',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    addonsSelected: []
  });

  const [roomTypes, setRoomTypes] = useState([]);
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  // Debug logging function
  const debugLog = (message, data = null) => {
    console.log(`[BookingPage Debug] ${message}`, data ? data : '');
  };

  // Fetch room types and add-ons on mount
  useEffect(() => {
    const fetchData = async () => {
      debugLog('Starting data fetch...');
      setIsFetching(true);
      setError(null);

      try {
        debugLog('Making API calls...');
        
        // Make API calls with timeout and better error handling
        const [roomTypesResponse, addonsResponse] = await Promise.allSettled([
          axios.get('http://192.168.1.15:8080/api/rooms/types', {
            timeout: 10000, // 10 second timeout
            headers: {
              'Content-Type': 'application/json',
            }
          }),
          axios.get('http://192.168.1.15:8080/api/addons', {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json',
            }
          })
        ]);

        debugLog('API responses received:', {
          roomTypesStatus: roomTypesResponse.status,
          addonsStatus: addonsResponse.status
        });

        // Handle room types response
        if (roomTypesResponse.status === 'fulfilled') {
          debugLog('Room types data:', roomTypesResponse.value.data);
          
          if (Array.isArray(roomTypesResponse.value.data)) {
            setRoomTypes(roomTypesResponse.value.data);
            
            // Set default room type if available
            if (roomTypesResponse.value.data.length > 0) {
              const defaultRoomTypeId = roomTypesResponse.value.data[0].id;
              debugLog('Setting default room type ID:', defaultRoomTypeId);
              setFormData(prev => ({ 
                ...prev, 
                roomTypeId: String(defaultRoomTypeId) // Ensure string type
              }));
            } else {
              debugLog('No room types available');
            }
          } else {
            debugLog('Room types response is not an array:', roomTypesResponse.value.data);
            setRoomTypes([]);
          }
        } else {
          debugLog('Room types API failed:', roomTypesResponse.reason);
          toast.error('Failed to load room types');
        }

        // Handle addons response
        if (addonsResponse.status === 'fulfilled') {
          debugLog('Addons data:', addonsResponse.value.data);
          
          if (Array.isArray(addonsResponse.value.data)) {
            setAddons(addonsResponse.value.data);
          } else {
            debugLog('Addons response is not an array:', addonsResponse.value.data);
            setAddons([]);
          }
        } else {
          debugLog('Addons API failed:', addonsResponse.reason);
          toast.error('Failed to load add-ons');
        }

      } catch (err) {
        debugLog('Fetch error caught:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load booking options';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsFetching(false);
        debugLog('Data fetch completed');
      }
    };

    fetchData();
  }, []);

  // Validate form inputs
  const validateForm = () => {
    debugLog('Validating form with data:', formData);
    const errors = {};
    const today = new Date().toISOString().split('T')[0];

    // Room type validation
    if (!formData.roomTypeId || formData.roomTypeId === '') {
      errors.roomTypeId = 'Room type is required';
    }

    // Date validations
    if (!formData.checkIn) {
      errors.checkIn = 'Check-in date is required';
    } else if (formData.checkIn < today) {
      errors.checkIn = 'Check-in cannot be in the past';
    }

    if (!formData.checkOut) {
      errors.checkOut = 'Check-out date is required';
    } else if (formData.checkOut <= formData.checkIn) {
      errors.checkOut = 'Check-out must be after check-in';
    }

    // Guest information validations
    if (!formData.fullName?.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      errors.email = 'Invalid email address';
    }

    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9\-\+\s\(\)]+$/.test(formData.phone.trim())) {
      errors.phone = 'Invalid phone number format';
    }

    // Guests validation
    const guestsNum = parseInt(formData.guests);
    if (!guestsNum || guestsNum < 1 || guestsNum > 10) {
      errors.guests = 'Number of guests must be between 1 and 10';
    }

    debugLog('Form validation errors:', errors);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    debugLog(`Input change - ${name}:`, value);
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    }));
    
    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddonToggle = (addonName) => {
    debugLog('Toggling addon:', addonName);
    debugLog('Current addons selected:', formData.addonsSelected);
    
    setFormData(prev => {
      const newAddons = prev.addonsSelected.includes(addonName)
        ? prev.addonsSelected.filter(a => a !== addonName)
        : [...prev.addonsSelected, addonName];
      
      debugLog('New addons selected:', newAddons);
      
      return {
        ...prev,
        addonsSelected: newAddons
      };
    });
  };

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

    // Prepare data for backend (BookingRequestDTO)
    const bookingData = {
      roomTypeId: parseInt(formData.roomTypeId),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      guests: parseInt(formData.guests),
      specialRequests: formData.specialRequests?.trim() || '',
      addonsSelected: formData.addonsSelected
    };

    debugLog('Booking data to submit:', bookingData);

    try {
      debugLog('Sending booking request...');
      
      const response = await axios.post('http://192.168.1.15:8080/api/bookings', bookingData, {
        timeout: 15000, // 15 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });

      debugLog('Booking response received:', response.data);
      
      if (response.data && response.data.id) {
        toast.success(`Booking successful! Booking ID: ${response.data.id}`);
        debugLog('Navigating to payment page with booking ID:', response.data.id);
        navigate('/payment', { state: { bookingId: response.data.id } });
      } else {
        debugLog('Invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
      
    } catch (err) {
      debugLog('Booking submission error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code
      });
      
      let errorMessage = 'Failed to create booking. Please try again.';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid booking data. Please check your inputs.';
      } else if (err.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      debugLog('Booking submission completed');
    }
  };

  // Loading state
  if (isFetching) {
    debugLog('Rendering loading state');
    return (
      <div className="booking-page">
        <div className="main-content" style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading booking options...</h2>
          <p>Please wait while we fetch the latest room types and services.</p>
        </div>
      </div>
    );
  }

  debugLog('Rendering main booking form');

  return (
    <div className="booking-page">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Header */}
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
              <a href="#" onClick={(e) => e.preventDefault()}>HOME</a>
              <a href="#" onClick={(e) => e.preventDefault()}>ROOMS</a>
              <a href="#" onClick={(e) => e.preventDefault()}>TARIFF</a>
              <a href="#" onClick={(e) => e.preventDefault()}>GALLERY</a>
              <a href="#" onClick={(e) => e.preventDefault()}>FACILITIES</a>
              <a href="#" className="contact-btn" onClick={(e) => e.preventDefault()}>CONTACT US</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Book Your Stay</h1>
          <p>Experience luxury and comfort at Enkeys Residency</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="main-content">
        <div className="booking-card">
          <div className="card-header">
            <h2>Make a Reservation</h2>
            <p>Fill in the details below to book your perfect stay</p>
          </div>

          <div className="card-body">
            {error && (
              <div className="error-message" style={{ 
                backgroundColor: '#fee', 
                border: '1px solid #fcc', 
                color: '#c00', 
                padding: '10px', 
                borderRadius: '4px', 
                marginBottom: '20px' 
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Room Type */}
                <div className="form-group">
                  <label className="form-label">Room Type *</label>
                  <select
                    name="roomTypeId"
                    value={formData.roomTypeId}
                    onChange={handleInputChange}
                    className={`form-select ${formErrors.roomTypeId ? 'error' : ''}`}
                    disabled={roomTypes.length === 0}
                    required
                  >
                    <option value="">Select a room type</option>
                    {roomTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name} {type.price ? `- ₹${type.price}/night` : ''}
                      </option>
                    ))}
                  </select>
                  {formErrors.roomTypeId && <span className="error-text">{formErrors.roomTypeId}</span>}
                  {roomTypes.length === 0 && (
                    <span className="info-text">No room types available at the moment</span>
                  )}
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
                    className={`form-select ${formErrors.guests ? 'error' : ''}`}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  {formErrors.guests && <span className="error-text">{formErrors.guests}</span>}
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
                    min={new Date().toISOString().split('T')[0]}
                    className={`form-input ${formErrors.checkIn ? 'error' : ''}`}
                    required
                  />
                  {formErrors.checkIn && <span className="error-text">{formErrors.checkIn}</span>}
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
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className={`form-input ${formErrors.checkOut ? 'error' : ''}`}
                    required
                  />
                  {formErrors.checkOut && <span className="error-text">{formErrors.checkOut}</span>}
                </div>
              </div>

              {/* Guest Information */}
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
                      className={`form-input ${formErrors.fullName ? 'error' : ''}`}
                      placeholder="Enter your full name"
                      required
                    />
                    {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
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
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      placeholder="Enter your email address"
                      required
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
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
                      className={`form-input ${formErrors.phone ? 'error' : ''}`}
                      placeholder="Enter your phone number"
                      required
                    />
                    {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Add-ons Section */}
              <div className="section-divider">
                <h3 className="section-title">Add-ons & Services</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '12px',
                  marginTop: '16px'
                }}>
                  {addons.length === 0 ? (
                    <span style={{ color: '#666', fontStyle: 'italic' }}>No add-ons available</span>
                  ) : (
                    addons.map(addon => (
                      <label key={addon.name} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        background: formData.addonsSelected.includes(addon.name) ? '#f0f8ff' : 'white',
                        transition: 'all 0.2s ease'
                      }}>
                        <input
                          type="checkbox"
                          checked={formData.addonsSelected.includes(addon.name)}
                          onChange={() => handleAddonToggle(addon.name)}
                          style={{ margin: 0 }}
                        />
                        <span style={{ fontSize: '14px', flex: 1 }}>{addon.name}</span>
                        <span style={{ fontWeight: 500, color: '#007bff' }}>
                          ₹{addon.price}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* Special Requests */}
              <div className="special-requests">
                <label className="form-label">Special Requests (Optional)</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Any special requirements or requests (dietary restrictions, accessibility needs, etc.)"
                  rows="4"
                />
              </div>

              {/* Booking Summary */}
              <div className="booking-summary" style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <h3 className="summary-title">Booking Summary</h3>
                <div className="summary-items">
                  <div className="summary-item">
                    <span>Room Type:</span>
                    <span className="summary-value">
                      {roomTypes.find(type => type.id === parseInt(formData.roomTypeId))?.name || 'Select a room'}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Guests:</span>
                    <span className="summary-value">{formData.guests} Guest{formData.guests > 1 ? 's' : ''}</span>
                  </div>
                  {formData.checkIn && (
                    <div className="summary-item">
                      <span>Check-in:</span>
                      <span className="summary-value">{new Date(formData.checkIn).toLocaleDateString()}</span>
                    </div>
                  )}
                  {formData.checkOut && (
                    <div className="summary-item">
                      <span>Check-out:</span>
                      <span className="summary-value">{new Date(formData.checkOut).toLocaleDateString()}</span>
                    </div>
                  )}
                  {formData.addonsSelected.length > 0 && (
                    <div className="summary-item">
                      <span>Add-ons:</span>
                      <span className="summary-value">
                        {formData.addonsSelected.map((addon, index) => (
                          <span key={addon}>
                            {addon} (₹{addons.find(a => a.name === addon)?.price || 'N/A'})
                            {index < formData.addonsSelected.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || isFetching || roomTypes.length === 0}
                style={{
                  width: '100%',
                  padding: '15px',
                  marginTop: '20px',
                  backgroundColor: loading || isFetching ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: loading || isFetching ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {loading ? 'Processing...' : 'Book Now'}
              </button>

              <p className="disclaimer" style={{ 
                fontSize: '12px', 
                color: '#666', 
                textAlign: 'center', 
                marginTop: '15px' 
              }}>
                By booking, you agree to our terms and conditions. You will receive a confirmation email shortly.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="contact-section">
        <div className="contact-container">
          <div className="contact-content">
            <h3 className="contact-title">Need Help with Your Booking?</h3>
            <p className="contact-subtitle">Our team is here to assist you 24/7</p>
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