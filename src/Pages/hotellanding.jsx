import React, { useState, useEffect } from 'react';
import { MapPin, Star, Wifi, Car, Coffee, Waves, Phone, Mail } from 'lucide-react';
import "../styles/hotellanding.css"

const HotelLandingPage = () => {
const [property, setProperty] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomsError, setRoomsError] = useState(null);

   useEffect(() => {
    const fetchPropertyData = async () => {
      try {

        const response = await fetch('http://192.168.1.14:8080/api/property/get-property?propertyName=The%20Raviz%20Kovalam');
        if (!response.ok) {
          throw new Error('Failed to fetch property data');
          
        }
        const data = await response.json();
        setProperty(data);
        console.log('[HotelLandingPage] Property data fetched:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

 const fetchRoomsData = async () => {
  try {
    console.log('[HotelLandingPage] Fetching rooms data...');
    const response = await fetch('http://192.168.1.14:8080/api/rooms/get-property-by-name?propertyName=23 prathibhatheerum');
    console.log('[HotelLandingPage] Rooms fetch status:', response.status);
    const text = await response.text();
    if (![200, 301, 302].includes(response.status)) {
      console.error('[HotelLandingPage] Rooms fetch response text:', text);
      throw new Error('Failed to fetch rooms data');
    }
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error('Rooms response is not valid JSON');
    }
    console.log('[HotelLandingPage] Rooms data fetched:', data);
    setRooms(Array.isArray(data) ? data : [data]);
  } catch (err) {
    setRoomsError(err.message);
    console.error('[HotelLandingPage] Rooms fetch error:', err);
  } finally {
    setRoomsLoading(false);
    console.log('[HotelLandingPage] Rooms data fetch completed');
  }
};

    fetchPropertyData();
    fetchRoomsData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading hotel information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Unable to load hotel information</h2>
        <p>Error: {error}</p>
        <p>Please try again later or contact us directly.</p>
      </div>
    );
  }

  // Helper for image if propertyImage1 is a base64 string
  const getImageSrc = (img) => {
    if (!img) return null;
    if (img.startsWith('data:image')) return img;
    return `data:image/jpeg;base64,${img}`;
  };

  return (
    <div className="hotel-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {property?.propertyImage1 && (
            <img
              src={getImageSrc(property.propertyImage1)}
              alt={property.propertyName}
              className="hero-image"
              style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 12, marginBottom: 16 }}
            />
          )}
          <h1>{property?.propertyName}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
            <span className="property-type">{property?.propertyType}</span>
            {property?.propertyRating && (
              <span className="property-rating" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={18} color="#FFD700" fill="#FFD700" />
                {property.propertyRating}
              </span>
            )}
          </div>
          <p>{property?.propertyDescription}</p>
          <div className="location-info">
            <MapPin size={20} />
            <span>
              {property?.propertyAddress}
              {property?.propertyCity ? `, ${property.propertyCity}` : ''}
              {property?.propertyState ? `, ${property.propertyState}` : ''}
              {property?.propertyCountry ? `, ${property.propertyCountry}` : ''}
            </span>
          </div>
          <div style={{ margin: '8px 0', fontWeight: 500 }}>
            Starting from ₹{property?.propertyBasePrice?.toLocaleString()} / night
          </div>
          <button className="cta-button">Book Your Stay</button>
        </div>
      </section>

      {/* Property Details Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">About the Property</h2>
          <div className="property-details">
            <div><strong>License Number:</strong> {property?.propertyLicenseNumber || 'N/A'}</div>
            <div><strong>Insurance:</strong> {property?.propertyInsuranceDetails || 'N/A'}</div>
            <div><strong>Status:</strong> {property?.approvalStatus}</div>
          </div>
        </div>
      </section>

      {/* Amenities Section (static, since not in API) */}
      <section className="section amenities-section">
        <div className="container">
          <h2 className="section-title">Premium Amenities</h2>
          <div className="amenities-grid">
            <div className="amenity-item">
              <div className="amenity-icon">
                <Wifi size={30} />
              </div>
              <h3>Free Wi-Fi</h3>
              <p>High-speed internet throughout the property</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">
                <Car size={30} />
              </div>
              <h3>Valet Parking</h3>
              <p>Complimentary parking with valet service</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">
                <Coffee size={30} />
              </div>
              <h3>Restaurant & Bar</h3>
              <p>Fine dining with local and international cuisine</p>
            </div>
            <div className="amenity-item">
              <div className="amenity-icon">
                <Waves size={30} />
              </div>
              <h3>Beach Access</h3>
              <p>Direct access to pristine Kovalam beach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Gallery Section */}
<section className="section room-gallery-section">
  <div className="container">
    <h2 className="section-title">Room Gallery</h2>
    {roomsLoading ? (
      <div>Loading rooms...</div>
    ) : roomsError ? (
      <div style={{ color: 'red' }}>Failed to load rooms: {roomsError}</div>
    ) : rooms.length === 0 ? (
      <div>No rooms available.</div>
    ) : (
      <div className="room-gallery-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <div className="room-images">
              {room.images && room.images.length > 0 ? (
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                  {room.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={room.roomTypeName}
                      className="room-image"
                      style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }}
                    />
                  ))}
                </div>
              ) : (
                <div className="room-image-placeholder">No Image</div>
              )}
            </div>
            <div className="room-info">
              <h3>{room.roomTypeName}</h3>
              <p>{room.description}</p>
              <div>
                <strong>Price:</strong> ₹{room.pricePerNight?.toLocaleString()} / night
              </div>
              <div>
                <strong>Adults:</strong> {room.capacityAdults} &nbsp;
                <strong>Children:</strong> {room.capacityChildren}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</section>


      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={30} />
              </div>
              <h3>Call Us</h3>
              <p>{property?.propertyPhoneNumber || 'Not available'}</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={30} />
              </div>
              <h3>Email Us</h3>
              <p>{property?.propertyEmail || 'Not available'}</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={30} />
              </div>
              <h3>Visit Us</h3>
              <p>
                {property?.propertyAddress}
                {property?.propertyCity ? `, ${property.propertyCity}` : ''}
                {property?.propertyState ? `, ${property.propertyState}` : ''}
                {property?.propertyCountry ? `, ${property.propertyCountry}` : ''}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelLandingPage;