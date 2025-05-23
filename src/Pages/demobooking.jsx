import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Phone, Mail, Plus, Minus } from 'lucide-react';
import "../styles/demobooking.css";

export default function BookingPageDemo() {
  const [formData, setFormData] = useState({
    roomId: '',
    checkIn: '',
    checkOut: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    adultCount: 2,
    childrenCount: 0,
    addonsSelected: [],
    specialRequests: ''
  });

  const [rooms, setRooms] = useState([]);
  const [availableAddons, setAvailableAddons] = useState([
    'Airport Transfer',
    'Extra Bed',
    'Late Checkout',
    'Early Checkin',
    'Breakfast',
    'Spa Services',
    'Room Service',
    'Laundry Service'
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock rooms data - replace with actual API call
  useEffect(() => {
    setRooms([
      { id: 1, type: 'Suite Room', price: 5000 },
      { id: 2, type: 'Deluxe Room', price: 3500 },
      { id: 3, type: 'Standard Room', price: 2500 },
      { id: 4, type: 'Family Room', price: 4000 }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountChange = (field, increment) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(field === 'adultCount' ? 1 : 0, prev[field] + (increment ? 1 : -1))
    }));
  };

  const handleAddonToggle = (addon) => {
    setFormData(prev => ({
      ...prev,
      addonsSelected: prev.addonsSelected.includes(addon)
        ? prev.addonsSelected.filter(a => a !== addon)
        : [...prev.addonsSelected, addon]
    }));
  };

  const calculateTotal = () => {
    const selectedRoom = rooms.find(room => room.id === parseInt(formData.roomId));
    if (!selectedRoom || !formData.checkIn || !formData.checkOut) return 0;

    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    let total = selectedRoom.price * nights;
    
    // Add addon costs (mock pricing)
    const addonPrices = {
      'Airport Transfer': 500,
      'Extra Bed': 1000,
      'Late Checkout': 500,
      'Early Checkin': 500,
      'Breakfast': 300,
      'Spa Services': 2000,
      'Room Service': 800,
      'Laundry Service': 400
    };
    
    formData.addonsSelected.forEach(addon => {
      total += addonPrices[addon] || 0;
    });
    
    return total;
  };

  useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [formData.roomId, formData.checkIn, formData.checkOut, formData.addonsSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        room: { id: parseInt(formData.roomId) },
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        adultCount: formData.adultCount,
        childrenCount: formData.childrenCount,
        addonsSelected: formData.addonsSelected,
        specialRequests: formData.specialRequests,
        totalAmount: totalAmount,
        paymentStatus: 'PENDING'
      };

      // Replace with your actual API endpoint
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Booking confirmed! Booking ID: ${result.id}`);
        // Reset form or redirect to confirmation page
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedRoom = rooms.find(room => room.id === parseInt(formData.roomId));

  return (
    <div className="booking-page">
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
              <a href="#">HOME</a>
              <a href="#">ROOMS</a>
              <a href="#">TARIFF</a>
              <a href="#">GALLERY</a>
              <a href="#">FACILITIES</a>
              <a href="#" className="contact-btn">CONTACT US</a>
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
            <div className="form-grid">
              {/* Room Selection */}
              <div className="form-group">
                <label className="form-label">
                  Room Type
                </label>
                <select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a room</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.type} - ₹{room.price}/night
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in Date */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="icon" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="form-input"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="icon" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className="form-input"
                  required
                />
              </div>

              {/* Adult Count */}
              <div className="form-group">
                <label className="form-label">
                  <Users className="icon" />
                  Adults
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleCountChange('adultCount', false)}
                    disabled={formData.adultCount <= 1}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <Minus className="icon" />
                  </button>
                  <span style={{
                    padding: '8px 16px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    minWidth: '50px',
                    textAlign: 'center'
                  }}>
                    {formData.adultCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCountChange('adultCount', true)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus className="icon" />
                  </button>
                </div>
              </div>

              {/* Children Count */}
              <div className="form-group">
                <label className="form-label">
                  <Users className="icon" />
                  Children
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleCountChange('childrenCount', false)}
                    disabled={formData.childrenCount <= 0}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <Minus className="icon" />
                  </button>
                  <span style={{
                    padding: '8px 16px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    minWidth: '50px',
                    textAlign: 'center'
                  }}>
                    {formData.childrenCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCountChange('childrenCount', true)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus className="icon" />
                  </button>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="section-divider">
              <h3 className="section-title">Guest Information</h3>
              
              <div className="guest-info-grid">
                <div className="form-group">
                  <label className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Mail className="icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone className="icon" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="section-divider">
              <h3 className="section-title">Add-ons & Services</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '12px',
                marginTop: '16px'
              }}>
                {availableAddons.map(addon => (
                  <label key={addon} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    cursor: 'pointer',
                    padding: '8px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    background: formData.addonsSelected.includes(addon) ? '#f0f8ff' : 'white'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.addonsSelected.includes(addon)}
                      onChange={() => handleAddonToggle(addon)}
                      style={{ margin: 0 }}
                    />
                    <span style={{ fontSize: '14px' }}>{addon}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="special-requests">
              <label className="form-label">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Any special requirements or requests..."
              />
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h3 className="summary-title">Booking Summary</h3>
              <div className="summary-items">
                {selectedRoom && (
                  <div className="summary-item">
                    <span>Room Type:</span>
                    <span className="summary-value">{selectedRoom.type}</span>
                  </div>
                )}
                <div className="summary-item">
                  <span>Adults:</span>
                  <span className="summary-value">{formData.adultCount}</span>
                </div>
                {formData.childrenCount > 0 && (
                  <div className="summary-item">
                    <span>Children:</span>
                    <span className="summary-value">{formData.childrenCount}</span>
                  </div>
                )}
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
                    <span className="summary-value">{formData.addonsSelected.join(', ')}</span>
                  </div>
                )}
                {totalAmount > 0 && (
                  <div className="summary-item" style={{ 
                    borderTop: '1px solid #e0e0e0', 
                    paddingTop: '8px', 
                    marginTop: '8px',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    <span>Total Amount:</span>
                    <span className="summary-value" style={{ color: '#007bff' }}>
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !formData.roomId || !formData.checkIn || !formData.checkOut}
              className="submit-btn"
              style={{
                opacity: (loading || !formData.roomId || !formData.checkIn || !formData.checkOut) ? 0.6 : 1,
                cursor: (loading || !formData.roomId || !formData.checkIn || !formData.checkOut) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : 'Book Now'}
            </button>

            <p className="disclaimer">
              By booking, you agree to our terms and conditions. You will receive a confirmation email shortly.
            </p>
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
                <span>Pathirappally, Alappuzha 688521</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}