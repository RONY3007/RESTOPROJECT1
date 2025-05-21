import React, { useState } from 'react';
import { Calendar, Users, MapPin, Phone, Mail } from 'lucide-react';
import '../styles/landingpage.css'; // Import the CSS file

export default function BookingPage() {
  const [formData, setFormData] = useState({
    roomType: 'suite',
    guests: 2,
    checkIn: '',
    checkOut: '',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Booking request submitted successfully!');
  };

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
              {/* Room Type */}
              <div className="form-group">
                <label className="form-label">
                  Room Type
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="suite">Suite Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="standard">Standard Room</option>
                  <option value="family">Family Room</option>
                </select>
              </div>

              {/* Number of Guests */}
              <div className="form-group">
                <label className="form-label">
                  <Users className="icon" />
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
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
                    name="fullName"
                    value={formData.fullName}
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
                    name="email"
                    value={formData.email}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
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
                <div className="summary-item">
                  <span>Room Type:</span>
                  <span className="summary-value">{formData.roomType} Room</span>
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
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="submit-btn"
            >
              Book Now
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
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>reservations@enkeysresidency.com</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Luxury Street, City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}