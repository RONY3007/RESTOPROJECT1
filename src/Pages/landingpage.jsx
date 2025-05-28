// import React, { useState } from 'react';
// import { Calendar, Users, MapPin, Phone, Mail } from 'lucide-react';
// import '../styles/landingpage.css'; // Import the CSS file

// export default function BookingPage() {
//   // Add availableAddons array
//   const availableAddons = [
//     'Airport Transfer',
//     'Extra Bed',
//     'Late Checkout',
//     'Early Checkin',
//     'Breakfast',
//     'Spa Services',
//     'Room Service',
//     'Laundry Service'
//   ];

//   const [formData, setFormData] = useState({
//     roomType: 'suite',
//     guests: 2,
//     checkIn: '',
//     checkOut: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     specialRequests: '',
//     addonsSelected: [] // <-- Initialize addonsSelected
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Booking submitted:', formData);
//     alert('Booking request submitted successfully!');
//   };

//   const handleAddonToggle = (addon) => {
//     setFormData(prev => ({
//       ...prev,
//       addonsSelected: prev.addonsSelected.includes(addon)
//         ? prev.addonsSelected.filter(a => a !== addon)
//         : [...prev.addonsSelected, addon]
//     }));
//   };

//   const addonPrices = {
//     'Airport Transfer': 500,
//     'Extra Bed': 1000,
//     'Late Checkout': 500,
//     'Early Checkin': 500,
//     'Breakfast': 300,
//     'Spa Services': 2000,
//     'Room Service': 800,
//     'Laundry Service': 400
//   };

//   return (
//     <div className="booking-page">
//       {/* Header */}
//       <header className="header">
//         <div className="header-container">
//           <div className="header-content">
//             <div className="logo-container">
//               <div className="logo">
//                 <div className="logo-main">ENKEYS</div>
//                 <div className="logo-sub">Residency</div>
//               </div>
//             </div>
//             <nav className="nav">
//               <a href="#">HOME</a>
//               <a href="#">ROOMS</a>
//               <a href="#">TARIFF</a>
//               <a href="#">GALLERY</a>
//               <a href="#">FACILITIES</a>
//               <a href="#" className="contact-btn">CONTACT US</a>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="hero">
//         <div className="hero-overlay"></div>
//         <div className="hero-content">
//           <h1>Book Your Stay</h1>
//           <p>Experience luxury and comfort at Enkeys Residency</p>
//         </div>
//       </div>

//       {/* Booking Form */}
//       <div className="main-content">
//         <div className="booking-card">
//           <div className="card-header">
//             <h2>Make a Reservation</h2>
//             <p>Fill in the details below to book your perfect stay</p>
//           </div>

//           <div className="card-body">
//             <div className="form-grid">
//               {/* Room Type */}
//               <div className="form-group">
//                 <label className="form-label">
//                   Room Type
//                 </label>
//                 <select
//                   name="roomType"
//                   value={formData.roomType}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="suite">Suite Room</option>
//                   <option value="deluxe">Deluxe Room</option>
//                   <option value="standard">Standard Room</option>
//                   <option value="family">Family Room</option>
//                 </select>
//               </div>

              

              
//               {/* Number of Guests */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <Users className="icon" />
//                   Number of Guests
//                 </label>
//                 <select
//                   name="guests"
//                   value={formData.guests}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   {[1, 2, 3, 4, 5, 6].map(num => (
//                     <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Check-in Date */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <Calendar className="icon" />
//                   Check-in Date
//                 </label>
//                 <input
//                   type="date"
//                   name="checkIn"
//                   value={formData.checkIn}
//                   onChange={handleInputChange}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="form-input"
//                   required
//                 />
//               </div>

//               {/* Check-out Date */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <Calendar className="icon" />
//                   Check-out Date
//                 </label>
//                 <input
//                   type="date"
//                   name="checkOut"
//                   value={formData.checkOut}
//                   onChange={handleInputChange}
//                   min={formData.checkIn || new Date().toISOString().split('T')[0]}
//                   className="form-input"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Guest Information */}
//             <div className="section-divider">
//               <h3 className="section-title">Guest Information</h3>

//               <div className="guest-info-grid">
//                 <div className="form-group">
//                   <label className="form-label">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <Mail className="icon" />
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <Phone className="icon" />
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Add-ons Section */}
//               <div className="section-divider">
//                 <h3 className="section-title">Add-ons & Services</h3>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                   gap: '12px',
//                   marginTop: '16px'
//                 }}>
//                   {availableAddons.map(addon => (
//                     <label key={addon} style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       cursor: 'pointer',
//                       padding: '8px',
//                       border: '1px solid #e0e0e0',
//                       borderRadius: '4px',
//                       background: formData.addonsSelected.includes(addon) ? '#f0f8ff' : 'white'
//                     }}>
//                       <input
//                         type="checkbox"
//                         checked={formData.addonsSelected.includes(addon)}
//                         onChange={() => handleAddonToggle(addon)}
//                         style={{ margin: 0 }}
//                       />
//                       <span style={{ fontSize: '14px' }}>{addon}</span>
//                       <span style={{ marginLeft: 'auto', fontWeight: 500, color: '#888' }}>
//                         ₹{addonPrices[addon]}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
           
//             {/* Special Requests */}
//             <div className="special-requests">
//               <label className="form-label">
//                 Special Requests (Optional)
//               </label>
//               <textarea
//                 name="specialRequests"
//                 value={formData.specialRequests}
//                 onChange={handleInputChange}
//                 className="form-textarea"
//                 placeholder="Any special requirements or requests..."
//               />
//             </div>

//             {/* Booking Summary */}
//             <div className="booking-summary">
//               <h3 className="summary-title">Booking Summary</h3>
//               <div className="summary-items">
//                 <div className="summary-item">
//                   <span>Room Type:</span>
//                   <span className="summary-value">{formData.roomType} Room</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Guests:</span>
//                   <span className="summary-value">{formData.guests} Guest{formData.guests > 1 ? 's' : ''}</span>
//                 </div>
//                 {formData.checkIn && (
//                   <div className="summary-item">
//                     <span>Check-in:</span>
//                     <span className="summary-value">{new Date(formData.checkIn).toLocaleDateString()}</span>
//                   </div>
//                 )}
//                 {formData.checkOut && (
//                   <div className="summary-item">
//                     <span>Check-out:</span>
//                     <span className="summary-value">{new Date(formData.checkOut).toLocaleDateString()}</span>
//                   </div>
//                 )}
//                 {formData.addonsSelected && formData.addonsSelected.length > 0 && (
//                   <div className="summary-item">
//                     <span>Add-ons:</span>
//                     <span className="summary-value">
//                       {formData.addonsSelected.map(addon => (
//                         <span key={addon}>
//                           {addon} (₹{addonPrices[addon]}){', '}
//                         </span>
//                       ))}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               className="submit-btn"
//             >
//               Book Now
//             </button>

//             <p className="disclaimer">
//               By booking, you agree to our terms and conditions. You will receive a confirmation email shortly.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className="contact-section">
//         <div className="contact-container">
//           <div className="contact-content">
//             <h3 className="contact-title">Need Help with Your Booking?</h3>
//             <p className="contact-subtitle">Our team is here to assist you 24/7</p>
//             <div className="contact-info">
//               <div className="contact-item">
//                 <Phone className="contact-icon" />
//                 <span>+ 0477 225 8462</span>
//               </div>
//               <div className="contact-item">
//                 <Mail className="contact-icon" />
//                 <span>enkeysresidency@gmail.com</span>
//               </div>
//               <div className="contact-item">
//                 <MapPin className="contact-icon" />
//                 <span>Pathirappaly, Alappuzha 688521</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








































// import React, { useState } from 'react';
// import { Calendar, Users, MapPin, Phone, Mail } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/landingpage.css'; // Import the CSS file

// export default function BookingPage() {
//   // Map room types to room IDs (assumed for demonstration; ideally fetch from backend)
//   const roomTypeToId = {
//     suite: 1,
//     deluxe: 2,
//     standard: 3,
//     family: 4
//   };

//   const navigate = useNavigate();

//   // Available add-ons (aligned with backend)
//   const availableAddons = [
//     'Breakfast',
//     'Airport Pickup',
//     'Extra Bed',
//     'Late Checkout',
//     'Early Checkin',
//     'Spa Services',
//     'Room Service',
//     'Laundry Service'
//   ];

//   // Add-on prices for display (aligned with frontend, backend handles actual pricing)
//   const addonPrices = {
//     'Breakfast': 300,
//     'Airport Pickup': 500,
//     'Extra Bed': 1000,
//     'Late Checkout': 500,
//     'Early Checkin': 500,
//     'Spa Services': 2000,
//     'Room Service': 800,
//     'Laundry Service': 400
//   };

//   const [formData, setFormData] = useState({
//     roomType: 'suite',
//     guests: 2,
//     checkIn: '',
//     checkOut: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     specialRequests: '',
//     addonsSelected: []
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleAddonToggle = (addon) => {
//     setFormData(prev => ({
//       ...prev,
//       addonsSelected: prev.addonsSelected.includes(addon)
//         ? prev.addonsSelected.filter(a => a !== addon)
//         : [...prev.addonsSelected, addon]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     navigate('/payment');

//     // Prepare data for backend (BookingRequestDTO)
//     const bookingData = {
//       roomId: roomTypeToId[formData.roomType],
//       checkIn: formData.checkIn,
//       checkOut: formData.checkOut,
//       fullName: formData.fullName,
//       email: formData.email,
//       phone: formData.phone,
//       guests: parseInt(formData.guests),
//       specialRequests: formData.specialRequests,
//       addonsSelected: formData.addonsSelected.map(addon => addon.toLowerCase()) // Backend expects lowercase
//     };

//     try {
//       const response = await axios.post('http://192.168.1.15:8080/api/bookings', bookingData);
//       console.log('Booking response:', response.data);
//       alert(`Booking successful! Booking ID: ${response.data.id}`);
//       // Reset form after successful submission
//       setFormData({
//         roomType: 'suite',
//         guests: 2,
//         checkIn: '',
//         checkOut: '',
//         fullName: '',
//         email: '',
//         phone: '',
//         specialRequests: '',
//         addonsSelected: []
//       });
//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="booking-page">
//       {/* Header */}
//       <header className="header">
//         <div className="header-container">
//           <div className="header-content">
//             <div className="logo-container">
//               <div className="logo">
//                 <div className="logo-main">ENKEYS</div>
//                 <div className="logo-sub">Residency</div>
//               </div>
//             </div>
//             <nav className="nav">
//               <a href="#">HOME</a>
//               <a href="#">ROOMS</a>
//               <a href="#">TARIFF</a>
//               <a href="#">GALLERY</a>
//               <a href="#">FACILITIES</a>
//               <a href="#" className="contact-btn">CONTACT US</a>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="hero">
//         <div className="hero-overlay"></div>
//         <div className="hero-content">
//           <h1>Book Your Stay</h1>
//           <p>Experience luxury and comfort at Enkeys Residency</p>
//         </div>
//       </div>

//       {/* Booking Form */}
//       <div className="main-content">
//         <div className="booking-card">
//           <div className="card-header">
//             <h2>Make a Reservation</h2>
//             <p>Fill in the details below to book your perfect stay</p>
//           </div>

//           <div className="card-body">
//             {error && <div className="error-message">{error}</div>}
//             <div className="form-grid">
//               {/* Room Type */}
//               <div className="form-group">
//                 <label className="form-label">Room Type</label>
//                 <select
//                   name="roomType"
//                   value={formData.roomType}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   <option value="suite">Suite Room</option>
//                   <option value="deluxe">Deluxe Room</option>
//                   <option value="standard">Standard Room</option>
//                   <option value="family">Family Room</option>
//                 </select>
//               </div>

//               {/* Number of Guests */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <Users className="icon" />
//                   Number of Guests
//                 </label>
//                 <select
//                   name="guests"
//                   value={formData.guests}
//                   onChange={handleInputChange}
//                   className="form-select"
//                 >
//                   {[1, 2, 3, 4, 5, 6].map(num => (
//                     <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Check-in Date */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <Calendar className="icon" />
//                   Check-in Date
//                 </label>
//                 <input
//                   type="date"
//                   name="checkIn"
//                   value={formData.checkIn}
//                   onChange={handleInputChange}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="form-input"
//                   required
//                 />
//               </div>

//               {/* Check-out Date */}
//               <div className="form-group">
//                 <label className="form-label">
//                   <Calendar className="icon" />
//                   Check-out Date
//                 </label>
//                 <input
//                   type="date"
//                   name="checkOut"
//                   value={formData.checkOut}
//                   onChange={handleInputChange}
//                   min={formData.checkIn || new Date().toISOString().split('T')[0]}
//                   className="form-input"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Guest Information */}
//             <div className="section-divider">
//               <h3 className="section-title">Guest Information</h3>
//               <div className="guest-info-grid">
//                 <div className="form-group">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <Mail className="icon" />
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     <Phone className="icon" />
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Add-ons Section */}
//             <div className="section-divider">
//               <h3 className="section-title">Add-ons & Services</h3>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//                 gap: '12px',
//                 marginTop: '16px'
//               }}>
//                 {availableAddons.map(addon => (
//                   <label key={addon} style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     cursor: 'pointer',
//                     padding: '8px',
//                     border: '1px solid #e0e0e0',
//                     borderRadius: '4px',
//                     background: formData.addonsSelected.includes(addon) ? '#f0f8ff' : 'white'
//                   }}>
//                     <input
//                       type="checkbox"
//                       checked={formData.addonsSelected.includes(addon)}
//                       onChange={() => handleAddonToggle(addon)}
//                       style={{ margin: 0 }}
//                     />
//                     <span style={{ fontSize: '14px' }}>{addon}</span>
//                     <span style={{ marginLeft: 'auto', fontWeight: 500, color: '#888' }}>
//                       ₹{addonPrices[addon]}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Special Requests */}
//             <div className="special-requests">
//               <label className="form-label">Special Requests (Optional)</label>
//               <textarea
//                 name="specialRequests"
//                 value={formData.specialRequests}
//                 onChange={handleInputChange}
//                 className="form-textarea"
//                 placeholder="Any special requirements or requests..."
//               />
//             </div>

//             {/* Booking Summary */}
//             <div className="booking-summary">
//               <h3 className="summary-title">Booking Summary</h3>
//               <div className="summary-items">
//                 <div className="summary-item">
//                   <span>Room Type:</span>
//                   <span className="summary-value">{formData.roomType.charAt(0).toUpperCase() + formData.roomType.slice(1)} Room</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Guests:</span>
//                   <span className="summary-value">{formData.guests} Guest{formData.guests > 1 ? 's' : ''}</span>
//                 </div>
//                 {formData.checkIn && (
//                   <div className="summary-item">
//                     <span>Check-in:</span>
//                     <span className="summary-value">{new Date(formData.checkIn).toLocaleDateString()}</span>
//                   </div>
//                 )}
//                 {formData.checkOut && (
//                   <div className="summary-item">
//                     <span>Check-out:</span>
//                     <span className="summary-value">{new Date(formData.checkOut).toLocaleDateString()}</span>
//                   </div>
//                 )}
//                 {formData.addonsSelected.length > 0 && (
//                   <div className="summary-item">
//                     <span>Add-ons:</span>
//                     <span className="summary-value">
//                       {formData.addonsSelected.map(addon => (
//                         <span key={addon}>
//                           {addon} (₹{addonPrices[addon]}){', '}
//                         </span>
//                       ))}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               className="submit-btn"
//               disabled={loading}
//             >
//               {loading ? 'Submitting...' : 'Book Now'}
//             </button>

//             <p className="disclaimer">
//               By booking, you agree to our terms and conditions. You will receive a confirmation email shortly.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className="contact-section">
//         <div className="contact-container">
//           <div className="contact-content">
//             <h3 className="contact-title">Need Help with Your Booking?</h3>
//             <p className="contact-subtitle">Our team is here to assist you 24/7</p>
//             <div className="contact-info">
//               <div className="contact-item">
//                 <Phone className="contact-icon" />
//                 <span>+ 0477 225 8462</span>
//               </div>
//               <div className="contact-item">
//                 <Mail className="contact-icon" />
//                 <span>enkeysresidency@gmail.com</span>
//               </div>
//               <div className="contact-item">
//                 <MapPin className="contact-icon" />
//                 <span>Pathirappaly, Alappuzha 688521</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













































javascript
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
  const [isFetching, setIsFetching] = useState(true); // Track initial API loading

  // Fetch room types and add-ons on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const [roomTypesResponse, addonsResponse] = await Promise.all([
          axios.get('http://192.168.1.15:8080/api/rooms/types'),
          axios.get('http://192.168.1.15:8080/api/addons')
        ]);

        setRoomTypes(roomTypesResponse.data);
        setAddons(addonsResponse.data);

        if (roomTypesResponse.data.length > 0) {
          setFormData(prev => ({ ...prev, roomTypeId: roomTypesResponse.data[0].id }));
        }
      } catch (err) {
        toast.error('Failed to load booking options. Please try again.');
        console.error('Fetch error:', err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.roomTypeId) errors.roomTypeId = 'Room type is required';
    if (!formData.checkIn) errors.checkIn = 'Check-in date is required';
    else if (formData.checkIn < today) errors.checkIn = 'Check-in cannot be in the past';
    if (!formData.checkOut) errors.checkOut = 'Check-out date is required';
    else if (formData.checkOut <= formData.checkIn) errors.checkOut = 'Check-out must be after check-in';
    if (!formData.fullName) errors.fullName = 'Full name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (!/^[0-9\-\+\s]+$/.test(formData.phone)) errors.phone = 'Invalid phone number';
    if (!formData.guests || formData.guests < 1) errors.guests = 'At least 1 guest is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAddonToggle = (addon) => {
    setFormData(prev => ({
      ...prev,
      addonsSelected: prev.addonsSelected.includes(addon)
        ? prev.addonsSelected.filter(a => a !== addon)
        : [...prev.addonsSelected, addon]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    navigate('/payment');

    if (!validateForm()) {
      setLoading(false);
      toast.error('Please fix the form errors');
      return;
    }

    // Prepare data for backend (BookingRequestDTO)
    const bookingData = {
      roomTypeId: parseInt(formData.roomTypeId),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      specialRequests: formData.specialRequests,
      addonsSelected: formData.addonsSelected
    };

    try {
      const response = await axios.post('http://192.168.1.15:8080/api/bookings', bookingData);
      toast.success(`Booking successful! Booking ID: ${response.data.id}`);
      navigate('/payment', { state: { bookingId: response.data.id } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create booking';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="booking-page">
        <div className="main-content" style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading booking options...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <ToastContainer position="top-right" autoClose={3000} />
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
            {error && <div className="error-message">{error}</div>}
            <div className="form-grid">
              {/* Room Type */}
              <div className="form-group">
                <label className="form-label">Room Type</label>
                <select
                  name="roomTypeId"
                  value={formData.roomTypeId}
                  onChange={handleInputChange}
                  className="form-select"
                  disabled={roomTypes.length === 0}
                >
                  {roomTypes.length === 0 ? (
                    <option value="">No room types available</option>
                  ) : (
                    roomTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))
                  )}
                </select>
                {formErrors.roomTypeId && <span className="error-text">{formErrors.roomTypeId}</span>}
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
                {formErrors.guests && <span className="error-text">{formErrors.guests}</span>}
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
                {formErrors.checkIn && <span className="error-text">{formErrors.checkIn}</span>}
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
                {formErrors.checkOut && <span className="error-text">{formErrors.checkOut}</span>}
              </div>
            </div>

            {/* Guest Information */}
            <div className="section-divider">
              <h3 className="section-title">Guest Information</h3>
              <div className="guest-info-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                  {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
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
                  {formErrors.email && <span className="error-text">{formErrors.email}</span>}
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
                  {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
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
                {addons.length === 0 ? (
                  <span>No add-ons available</span>
                ) : (
                  addons.map(addon => (
                    <label key={addon.name} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '8px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                      background: formData.addonsSelected.includes(addon.name) ? '#f0f8ff' : 'white'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.addonsSelected.includes(addon.name)}
                        onChange={() => handleAddonToggle(addon.name)}
                        style={{ margin: 0 }}
                      />
                      <span style={{ fontSize: '14px' }}>{addon.name}</span>
                      <span style={{ marginLeft: 'auto', fontWeight: 500, color: '#888' }}>
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
                placeholder="Any special requirements or requests..."
              />
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
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
                      {formData.addonsSelected.map(addon => (
                        <span key={addon}>
                          {addon} (₹{addons.find(a => a.name === addon)?.price || 'N/A'}){', '}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={loading || Object.keys(formErrors).length > 0 || isFetching}
            >
              {loading ? 'Submitting...' : 'Book Now'}
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
                <span>Pathirappaly, Alappuzha 688521</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
