// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/restoRegistration.css'; 

// const PropertyRegistration = () => {
//   const [property, setProperty] = useState({
//     propertyName: '',
//     propertyAddress: '',
//     propertyEmail: '',
//     propertyPassword: '',
//     propertyPhoneNumber: '',
//     propertyType: '',
//     propertyDescription: '',
//     propertyRating: 0,
//     propertyCity: '',
//     propertyState: '',
//     propertyCountry: '',
//     propertyBasePrice: 0,
//     propertyLicenseNumber: '',
//     propertyInsuranceDetails: ''
//   });

//   const [propertyImage1, setPropertyImage1] = useState(null);
//   const [propertyImage2, setPropertyImage2] = useState(null);
//   const [propertyImage3, setPropertyImage3] = useState(null);
//   const [licenseImage, setLicenseImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e, setImage) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Property Name validation
//     if (!property.propertyName.trim()) {
//       newErrors.propertyName = 'Property name cannot be blank';
//     } else if (property.propertyName.length < 3 || property.propertyName.length > 100) {
//       newErrors.propertyName = 'Property name must be between 3 and 100 characters';
//     }

//     // Address validation
//     if (!property.propertyAddress.trim()) {
//       newErrors.propertyAddress = 'Address cannot be blank';
//     } else if (property.propertyAddress.length < 10 || property.propertyAddress.length > 255) {
//       newErrors.propertyAddress = 'Address must be between 10 and 255 characters';
//     }

//     // Email validation
//     if (!property.propertyEmail.trim()) {
//       newErrors.propertyEmail = 'Email cannot be blank';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(property.propertyEmail)) {
//       newErrors.propertyEmail = 'Invalid email format';
//     }

//     // Password validation
//     if (!property.propertyPassword) {
//       newErrors.propertyPassword = 'Password cannot be blank';
//     } else if (property.propertyPassword.length < 8) {
//       newErrors.propertyPassword = 'Password must be at least 8 characters long';
//     }

//     // Phone number validation
//     if (!property.propertyPhoneNumber) {
//       newErrors.propertyPhoneNumber = 'Phone number cannot be blank';
//     } else if (!/^\d{10}$/.test(property.propertyPhoneNumber)) {
//       newErrors.propertyPhoneNumber = 'Phone number must be exactly 10 digits';
//     }

//     // Required fields
//     if (!property.propertyType) newErrors.propertyType = 'Property type cannot be blank';
//     if (!property.propertyCity) newErrors.propertyCity = 'City cannot be blank';
//     if (!property.propertyState) newErrors.propertyState = 'State cannot be blank';
//     if (!property.propertyCountry) newErrors.propertyCountry = 'Country cannot be blank';
//     if (!property.propertyLicenseNumber) newErrors.propertyLicenseNumber = 'License number cannot be blank';

//     // Description validation
//     if (property.propertyDescription && property.propertyDescription.length > 500) {
//       newErrors.propertyDescription = 'Description cannot exceed 500 characters';
//     }

//     // Rating validation
//     if (property.propertyRating < 0 || property.propertyRating > 5) {
//       newErrors.propertyRating = 'Rating must be between 0 and 5';
//     }

//     // Base price validation
//     if (property.propertyBasePrice < 0) {
//       newErrors.propertyBasePrice = 'Base price must be at least 0';
//     }

//     // Image validations
//     if (!propertyImage1) newErrors.propertyImage1 = 'Image 1 is required';
//     if (!licenseImage) newErrors.licenseImage = 'License image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validate()) return;

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('propertyData', new Blob([JSON.stringify(property)], { type: 'application/json' }));
//     if (propertyImage1) formData.append('propertyImage1', propertyImage1);
//     if (propertyImage2) formData.append('propertyImage2', propertyImage2);
//     if (propertyImage3) formData.append('propertyImage3', propertyImage3);
//     if (licenseImage) formData.append('licenseImage', licenseImage);

//     try {
//       const response = await axios.post('http://192.168.1.7:8080/api/property/addProperty', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccessMessage('Property registered successfully!');
//       // Reset form
//       setProperty({
//         propertyName: '',
//         propertyAddress: '',
//         propertyEmail: '',
//         propertyPassword: '',
//         propertyPhoneNumber: '',
//         propertyType: '',
//         propertyDescription: '',
//         propertyRating: 0,
//         propertyCity: '',
//         propertyState: '',
//         propertyCountry: '',
//         propertyBasePrice: 0,
//         propertyLicenseNumber: '',
//         propertyInsuranceDetails: ''
//       });
//       setPropertyImage1(null);
//       setPropertyImage2(null);
//       setPropertyImage3(null);
//       setLicenseImage(null);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: 'Failed to register property. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="property-registration-container">
//       <h1>Property Registration</h1>
//       {successMessage && <div className="success-message">{successMessage}</div>}
//       {errors.submit && <div className="error-message">{errors.submit}</div>}
      
//       <form onSubmit={handleSubmit} className="property-form">
//         <div className="form-section">
//           <h2>Basic Information</h2>
          
//           <div className="form-group">
//             <label htmlFor="propertyName">Property Name*</label>
//             <input
//               type="text"
//               id="propertyName"
//               name="propertyName"
//               value={property.propertyName}
//               onChange={handleChange}
//               className={errors.propertyName ? 'error' : ''}
//             />
//             {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyType">Property Type*</label>
//             <select
//               id="propertyType"
//               name="propertyType"
//               value={property.propertyType}
//               onChange={handleChange}
//               className={errors.propertyType ? 'error' : ''}
//             >
//               <option value="">Select Property Type</option>
//               <option value="Hotel">Hotel</option>
//               <option value="Resort">Resort</option>
//               <option value="Motel">Motel</option>
//               <option value="Guest House">Guest House</option>
//               <option value="Apartment">Apartment</option>
//             </select>
//             {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyDescription">Description</label>
//             <textarea
//               id="propertyDescription"
//               name="propertyDescription"
//               value={property.propertyDescription}
//               onChange={handleChange}
//               rows="4"
//               className={errors.propertyDescription ? 'error' : ''}
//             />
//             {errors.propertyDescription && <span className="error-message">{errors.propertyDescription}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyRating">Rating (0-5)</label>
//             <input
//               type="number"
//               id="propertyRating"
//               name="propertyRating"
//               value={property.propertyRating}
//               onChange={handleChange}
//               min="0"
//               max="5"
//               step="0.1"
//               className={errors.propertyRating ? 'error' : ''}
//             />
//             {errors.propertyRating && <span className="error-message">{errors.propertyRating}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyBasePrice">Base Price (per night)*</label>
//             <input
//               type="number"
//               id="propertyBasePrice"
//               name="propertyBasePrice"
//               value={property.propertyBasePrice}
//               onChange={handleChange}
//               min="0"
//               step="0.01"
//               className={errors.propertyBasePrice ? 'error' : ''}
//             />
//             {errors.propertyBasePrice && <span className="error-message">{errors.propertyBasePrice}</span>}
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Contact Information</h2>
          
//           <div className="form-group">
//             <label htmlFor="propertyEmail">Email*</label>
//             <input
//               type="email"
//               id="propertyEmail"
//               name="propertyEmail"
//               value={property.propertyEmail}
//               onChange={handleChange}
//               className={errors.propertyEmail ? 'error' : ''}
//             />
//             {errors.propertyEmail && <span className="error-message">{errors.propertyEmail}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyPassword">Password*</label>
//             <input
//               type="password"
//               id="propertyPassword"
//               name="propertyPassword"
//               value={property.propertyPassword}
//               onChange={handleChange}
//               className={errors.propertyPassword ? 'error' : ''}
//             />
//             {errors.propertyPassword && <span className="error-message">{errors.propertyPassword}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyPhoneNumber">Phone Number*</label>
//             <input
//               type="tel"
//               id="propertyPhoneNumber"
//               name="propertyPhoneNumber"
//               value={property.propertyPhoneNumber}
//               onChange={handleChange}
//               className={errors.propertyPhoneNumber ? 'error' : ''}
//             />
//             {errors.propertyPhoneNumber && <span className="error-message">{errors.propertyPhoneNumber}</span>}
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Location Information</h2>
          
//           <div className="form-group">
//             <label htmlFor="propertyAddress">Address*</label>
//             <input
//               type="text"
//               id="propertyAddress"
//               name="propertyAddress"
//               value={property.propertyAddress}
//               onChange={handleChange}
//               className={errors.propertyAddress ? 'error' : ''}
//             />
//             {errors.propertyAddress && <span className="error-message">{errors.propertyAddress}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyCity">City*</label>
//             <input
//               type="text"
//               id="propertyCity"
//               name="propertyCity"
//               value={property.propertyCity}
//               onChange={handleChange}
//               className={errors.propertyCity ? 'error' : ''}
//             />
//             {errors.propertyCity && <span className="error-message">{errors.propertyCity}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyState">State*</label>
//             <input
//               type="text"
//               id="propertyState"
//               name="propertyState"
//               value={property.propertyState}
//               onChange={handleChange}
//               className={errors.propertyState ? 'error' : ''}
//             />
//             {errors.propertyState && <span className="error-message">{errors.propertyState}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyCountry">Country*</label>
//             <input
//               type="text"
//               id="propertyCountry"
//               name="propertyCountry"
//               value={property.propertyCountry}
//               onChange={handleChange}
//               className={errors.propertyCountry ? 'error' : ''}
//             />
//             {errors.propertyCountry && <span className="error-message">{errors.propertyCountry}</span>}
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Legal Information</h2>
          
//           <div className="form-group">
//             <label htmlFor="propertyLicenseNumber">License Number*</label>
//             <input
//               type="text"
//               id="propertyLicenseNumber"
//               name="propertyLicenseNumber"
//               value={property.propertyLicenseNumber}
//               onChange={handleChange}
//               className={errors.propertyLicenseNumber ? 'error' : ''}
//             />
//             {errors.propertyLicenseNumber && <span className="error-message">{errors.propertyLicenseNumber}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="licenseImage">License Image*</label>
//             <input
//               type="file"
//               id="licenseImage"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, setLicenseImage)}
//               className={errors.licenseImage ? 'error' : ''}
//             />
//             {errors.licenseImage && <span className="error-message">{errors.licenseImage}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyInsuranceDetails">Insurance Details</label>
//             <textarea
//               id="propertyInsuranceDetails"
//               name="propertyInsuranceDetails"
//               value={property.propertyInsuranceDetails}
//               onChange={handleChange}
//               rows="3"
//             />
//           </div>
//         </div>

//         <div className="form-section">
//           <h2>Property Images</h2>
          
//           <div className="form-group">
//             <label htmlFor="propertyImage1">Image 1*</label>
//             <input
//               type="file"
//               id="propertyImage1"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, setPropertyImage1)}
//               className={errors.propertyImage1 ? 'error' : ''}
//             />
//             {errors.propertyImage1 && <span className="error-message">{errors.propertyImage1}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyImage2">Image 2</label>
//             <input
//               type="file"
//               id="propertyImage2"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, setPropertyImage2)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="propertyImage3">Image 3</label>
//             <input
//               type="file"
//               id="propertyImage3"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, setPropertyImage3)}
//             />
//           </div>
//         </div>

//         <div className="form-actions">
//           <button type="submit" disabled={isSubmitting} className="submit-button">
//             {isSubmitting ? 'Registering...' : 'Register Property'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PropertyRegistration;














// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/restoRegistration.css'; // Adjust the path as necessary

// const PropertyRegistration = () => {
//   const [property, setProperty] = useState({
//     propertyName: '',
//     propertyAddress: '',
//     propertyEmail: '',
//     propertyPassword: '',
//     propertyPhoneNumber: '',
//     propertyType: '',
//     propertyDescription: '',
//     propertyRating: 0,
//     propertyCity: '',
//     propertyState: '',
//     propertyCountry: '',
//     propertyBasePrice: 0,
//     propertyLicenseNumber: '',
//     propertyInsuranceDetails: ''
//   });

//   const [propertyImage1, setPropertyImage1] = useState(null);
//   const [propertyImage2, setPropertyImage2] = useState(null);
//   const [propertyImage3, setPropertyImage3] = useState(null);
//   const [licenseImage, setLicenseImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e, setImage) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     // Property Name validation
//     if (!property.propertyName.trim()) {
//       newErrors.propertyName = 'Property name cannot be blank';
//     } else if (property.propertyName.length < 3 || property.propertyName.length > 100) {
//       newErrors.propertyName = 'Property name must be between 3 and 100 characters';
//     }

//     // Address validation
//     if (!property.propertyAddress.trim()) {
//       newErrors.propertyAddress = 'Address cannot be blank';
//     } else if (property.propertyAddress.length < 10 || property.propertyAddress.length > 255) {
//       newErrors.propertyAddress = 'Address must be between 10 and 255 characters';
//     }

//     // Email validation
//     if (!property.propertyEmail.trim()) {
//       newErrors.propertyEmail = 'Email cannot be blank';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(property.propertyEmail)) {
//       newErrors.propertyEmail = 'Invalid email format';
//     }

//     // Password validation
//     if (!property.propertyPassword) {
//       newErrors.propertyPassword = 'Password cannot be blank';
//     } else if (property.propertyPassword.length < 8) {
//       newErrors.propertyPassword = 'Password must be at least 8 characters long';
//     }

//     // Phone number validation
//     if (!property.propertyPhoneNumber) {
//       newErrors.propertyPhoneNumber = 'Phone number cannot be blank';
//     } else if (!/^\d{10}$/.test(property.propertyPhoneNumber)) {
//       newErrors.propertyPhoneNumber = 'Phone number must be exactly 10 digits';
//     }

//     // Required fields
//     if (!property.propertyType) newErrors.propertyType = 'Property type cannot be blank';
//     if (!property.propertyCity) newErrors.propertyCity = 'City cannot be blank';
//     if (!property.propertyState) newErrors.propertyState = 'State cannot be blank';
//     if (!property.propertyCountry) newErrors.propertyCountry = 'Country cannot be blank';
//     if (!property.propertyLicenseNumber) newErrors.propertyLicenseNumber = 'License number cannot be blank';

//     // Description validation
//     if (property.propertyDescription && property.propertyDescription.length > 500) {
//       newErrors.propertyDescription = 'Description cannot exceed 500 characters';
//     }

//     // Rating validation
//     if (property.propertyRating < 0 || property.propertyRating > 5) {
//       newErrors.propertyRating = 'Rating must be between 0 and 5';
//     }

//     // Base price validation
//     if (property.propertyBasePrice < 0) {
//       newErrors.propertyBasePrice = 'Base price must be at least 0';
//     }

//     // Image validations
//     if (!propertyImage1) newErrors.propertyImage1 = 'Image 1 is required';
//     if (!licenseImage) newErrors.licenseImage = 'License image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validate()) return;

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('propertyData', new Blob([JSON.stringify(property)], { type: 'application/json' }));
//     if (propertyImage1) formData.append('propertyImage1', propertyImage1);
//     if (propertyImage2) formData.append('propertyImage2', propertyImage2);
//     if (propertyImage3) formData.append('propertyImage3', propertyImage3);
//     if (licenseImage) formData.append('licenseImage', licenseImage);

//     try {
//       const response = await axios.post('http://192.168.1.15:8080/api/property/addProperty', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccessMessage('Property registered successfully!');
//       // Reset form
//       setProperty({
//         propertyName: '',
//         propertyAddress: '',
//         propertyEmail: '',
//         propertyPassword: '',
//         propertyPhoneNumber: '',
//         propertyType: '',
//         propertyDescription: '',
//         propertyRating: 0,
//         propertyCity: '',
//         propertyState: '',
//         propertyCountry: '',
//         propertyBasePrice: 0,
//         propertyLicenseNumber: '',
//         propertyInsuranceDetails: ''
//       });
//       setPropertyImage1(null);
//       setPropertyImage2(null);
//       setPropertyImage3(null);
//       setLicenseImage(null);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: 'Failed to register property. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="property-registration-container">
//       <div className="registration-header">
//         <div className="header-content">
//           <h1 className="main-title">Property Registration</h1>
//           <p className="subtitle">List your property and start earning with our platform</p>
//         </div>
//         <div className="header-decoration"></div>
//       </div>

//       <div className="form-container">
//         {successMessage && (
//           <div className="alert success-alert">
//             <div className="alert-icon">✓</div>
//             <div className="alert-content">
//               <h3>Success!</h3>
//               <p>{successMessage}</p>
//             </div>
//           </div>
//         )}
        
//         {errors.submit && (
//           <div className="alert error-alert">
//             <div className="alert-icon">⚠</div>
//             <div className="alert-content">
//               <h3>Error</h3>
//               <p>{errors.submit}</p>
//             </div>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="property-form">
//           {/* Basic Information Section */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">🏢</div>
//               <div>
//                 <h2>Basic Information</h2>
//                 <p>Tell us about your property</p>
//               </div>
//             </div>
            
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="propertyName">Property Name <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   id="propertyName"
//                   name="propertyName"
//                   value={property.propertyName}
//                   onChange={handleChange}
//                   className={errors.propertyName ? 'error' : ''}
//                   placeholder="Enter your property name"
//                 />
//                 {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyType">Property Type <span className="required">*</span></label>
//                 <div className="select-wrapper">
//                   <select
//                     id="propertyType"
//                     name="propertyType"
//                     value={property.propertyType}
//                     onChange={handleChange}
//                     className={errors.propertyType ? 'error' : ''}
//                   >
//                     <option value="">Select Property Type</option>
//                     <option value="Hotel">Hotel</option>
//                     <option value="Resort">Resort</option>
//                     <option value="Motel">Motel</option>
//                     <option value="Guest House">Guest House</option>
//                     <option value="Apartment">Apartment</option>
//                   </select>
//                 </div>
//                 {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyRating">Rating (0-5)</label>
//                 <input
//                   type="number"
//                   id="propertyRating"
//                   name="propertyRating"
//                   value={property.propertyRating}
//                   onChange={handleChange}
//                   min="0"
//                   max="5"
//                   step="0.1"
//                   className={errors.propertyRating ? 'error' : ''}
//                   placeholder="0.0"
//                 />
//                 {errors.propertyRating && <span className="error-message">{errors.propertyRating}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyBasePrice">Base Price (per night) <span className="required">*</span></label>
//                 <div className="price-input">
//                   <span className="currency">$</span>
//                   <input
//                     type="number"
//                     id="propertyBasePrice"
//                     name="propertyBasePrice"
//                     value={property.propertyBasePrice}
//                     onChange={handleChange}
//                     min="0"
//                     step="0.01"
//                     className={errors.propertyBasePrice ? 'error' : ''}
//                     placeholder="0.00"
//                   />
//                 </div>
//                 {errors.propertyBasePrice && <span className="error-message">{errors.propertyBasePrice}</span>}
//               </div>
//             </div>

//             <div className="form-group full-width">
//               <label htmlFor="propertyDescription">Description</label>
//               <textarea
//                 id="propertyDescription"
//                 name="propertyDescription"
//                 value={property.propertyDescription}
//                 onChange={handleChange}
//                 rows="4"
//                 className={errors.propertyDescription ? 'error' : ''}
//                 placeholder="Describe your property, amenities, and what makes it special..."
//               />
//               {errors.propertyDescription && <span className="error-message">{errors.propertyDescription}</span>}
//             </div>
//           </div>

//           {/* Contact Information Section */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">📞</div>
//               <div>
//                 <h2>Contact Information</h2>
//                 <p>How guests can reach you</p>
//               </div>
//             </div>
            
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="propertyEmail">Email <span className="required">*</span></label>
//                 <input
//                   type="email"
//                   id="propertyEmail"
//                   name="propertyEmail"
//                   value={property.propertyEmail}
//                   onChange={handleChange}
//                   className={errors.propertyEmail ? 'error' : ''}
//                   placeholder="your@email.com"
//                 />
//                 {errors.propertyEmail && <span className="error-message">{errors.propertyEmail}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyPassword">Password <span className="required">*</span></label>
//                 <input
//                   type="password"
//                   id="propertyPassword"
//                   name="propertyPassword"
//                   value={property.propertyPassword}
//                   onChange={handleChange}
//                   className={errors.propertyPassword ? 'error' : ''}
//                   placeholder="Minimum 8 characters"
//                 />
//                 {errors.propertyPassword && <span className="error-message">{errors.propertyPassword}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyPhoneNumber">Phone Number <span className="required">*</span></label>
//                 <input
//                   type="tel"
//                   id="propertyPhoneNumber"
//                   name="propertyPhoneNumber"
//                   value={property.propertyPhoneNumber}
//                   onChange={handleChange}
//                   className={errors.propertyPhoneNumber ? 'error' : ''}
//                   placeholder="1234567890"
//                 />
//                 {errors.propertyPhoneNumber && <span className="error-message">{errors.propertyPhoneNumber}</span>}
//               </div>
//             </div>
//           </div>

//           {/* Location Information Section */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">📍</div>
//               <div>
//                 <h2>Location Information</h2>
//                 <p>Where is your property located</p>
//               </div>
//             </div>
            
//             <div className="form-group full-width">
//               <label htmlFor="propertyAddress">Address <span className="required">*</span></label>
//               <input
//                 type="text"
//                 id="propertyAddress"
//                 name="propertyAddress"
//                 value={property.propertyAddress}
//                 onChange={handleChange}
//                 className={errors.propertyAddress ? 'error' : ''}
//                 placeholder="Enter full address with street, building number"
//               />
//               {errors.propertyAddress && <span className="error-message">{errors.propertyAddress}</span>}
//             </div>

//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="propertyCity">City <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   id="propertyCity"
//                   name="propertyCity"
//                   value={property.propertyCity}
//                   onChange={handleChange}
//                   className={errors.propertyCity ? 'error' : ''}
//                   placeholder="City name"
//                 />
//                 {errors.propertyCity && <span className="error-message">{errors.propertyCity}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyState">State <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   id="propertyState"
//                   name="propertyState"
//                   value={property.propertyState}
//                   onChange={handleChange}
//                   className={errors.propertyState ? 'error' : ''}
//                   placeholder="State/Province"
//                 />
//                 {errors.propertyState && <span className="error-message">{errors.propertyState}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyCountry">Country <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   id="propertyCountry"
//                   name="propertyCountry"
//                   value={property.propertyCountry}
//                   onChange={handleChange}
//                   className={errors.propertyCountry ? 'error' : ''}
//                   placeholder="Country name"
//                 />
//                 {errors.propertyCountry && <span className="error-message">{errors.propertyCountry}</span>}
//               </div>
//             </div>
//           </div>

//           {/* Legal Information Section */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">📋</div>
//               <div>
//                 <h2>Legal Information</h2>
//                 <p>Required documentation and licensing</p>
//               </div>
//             </div>
            
//             <div className="form-grid">
//               <div className="form-group">
//                 <label htmlFor="propertyLicenseNumber">License Number <span className="required">*</span></label>
//                 <input
//                   type="text"
//                   id="propertyLicenseNumber"
//                   name="propertyLicenseNumber"
//                   value={property.propertyLicenseNumber}
//                   onChange={handleChange}
//                   className={errors.propertyLicenseNumber ? 'error' : ''}
//                   placeholder="Enter license number"
//                 />
//                 {errors.propertyLicenseNumber && <span className="error-message">{errors.propertyLicenseNumber}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="licenseImage">License Image <span className="required">*</span></label>
//                 <div className="file-input-wrapper">
//                   <input
//                     type="file"
//                     id="licenseImage"
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, setLicenseImage)}
//                     className={errors.licenseImage ? 'error' : ''}
//                   />
//                   <div className="file-input-label">
//                     <span className="file-icon">📄</span>
//                     <span>{licenseImage ? licenseImage.name : 'Choose license image'}</span>
//                   </div>
//                 </div>
//                 {errors.licenseImage && <span className="error-message">{errors.licenseImage}</span>}
//               </div>
//             </div>

//             <div className="form-group full-width">
//               <label htmlFor="propertyInsuranceDetails">Insurance Details</label>
//               <textarea
//                 id="propertyInsuranceDetails"
//                 name="propertyInsuranceDetails"
//                 value={property.propertyInsuranceDetails}
//                 onChange={handleChange}
//                 rows="3"
//                 placeholder="Provide insurance policy details (optional)"
//               />
//             </div>
//           </div>

//           {/* Property Images Section */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">📸</div>
//               <div>
//                 <h2>Property Images</h2>
//                 <p>Showcase your property with beautiful photos</p>
//               </div>
//             </div>
            
//             <div className="image-upload-grid">
//               <div className="form-group">
//                 <label htmlFor="propertyImage1">Main Image <span className="required">*</span></label>
//                 <div className="file-input-wrapper image-upload">
//                   <input
//                     type="file"
//                     id="propertyImage1"
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, setPropertyImage1)}
//                     className={errors.propertyImage1 ? 'error' : ''}
//                   />
//                   <div className="file-input-label">
//                     <span className="file-icon">🖼</span>
//                     <span>{propertyImage1 ? propertyImage1.name : 'Choose main image'}</span>
//                   </div>
//                 </div>
//                 {errors.propertyImage1 && <span className="error-message">{errors.propertyImage1}</span>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyImage2">Additional Image 1</label>
//                 <div className="file-input-wrapper image-upload">
//                   <input
//                     type="file"
//                     id="propertyImage2"
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, setPropertyImage2)}
//                   />
//                   <div className="file-input-label">
//                     <span className="file-icon">🖼</span>
//                     <span>{propertyImage2 ? propertyImage2.name : 'Choose image'}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="propertyImage3">Additional Image 2</label>
//                 <div className="file-input-wrapper image-upload">
//                   <input
//                     type="file"
//                     id="propertyImage3"
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, setPropertyImage3)}
//                   />
//                   <div className="file-input-label">
//                     <span className="file-icon">🖼</span>
//                     <span>{propertyImage3 ? propertyImage3.name : 'Choose image'}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="form-actions">
//             <button type="submit" disabled={isSubmitting} className="submit-button">
//               {isSubmitting ? (
//                 <>
//                   <span className="loading-spinner"></span>
//                   Registering Property...
//                 </>
//               ) : (
//                 <>
//                   <span className="button-icon">🚀</span>
//                   Register Property
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PropertyRegistration;






































// deepseek copying

// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaBuilding, FaEnvelope, FaMapMarkerAlt, FaFileAlt, FaImages, FaCheck, FaSpinner } from 'react-icons/fa';
// import '../styles/restoRegistration.css';

// const PropertyRegistration = () => {
//   const [property, setProperty] = useState({
//     propertyName: '',
//     propertyAddress: '',
//     propertyEmail: '',
//     propertyPassword: '',
//     propertyPhoneNumber: '',
//     propertyType: '',
//     propertyDescription: '',
//     propertyRating: 0,
//     propertyCity: '',
//     propertyState: '',
//     propertyCountry: '',
//     propertyBasePrice: 0,
//     propertyLicenseNumber: '',
//     propertyInsuranceDetails: ''
//   });

//   const [propertyImage1, setPropertyImage1] = useState(null);
//   const [propertyImage2, setPropertyImage2] = useState(null);
//   const [propertyImage3, setPropertyImage3] = useState(null);
//   const [licenseImage, setLicenseImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [currentStep, setCurrentStep] = useState(1);

//   const steps = [
//     { id: 1, name: 'Basic Info', icon: <FaBuilding /> },
//     { id: 2, name: 'Contact', icon: <FaEnvelope /> },
//     { id: 3, name: 'Location', icon: <FaMapMarkerAlt /> },
//     { id: 4, name: 'Legal', icon: <FaFileAlt /> },
//     { id: 5, name: 'Images', icon: <FaImages /> }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e, setImage) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!property.propertyName.trim()) {
//         newErrors.propertyName = 'Property name cannot be blank';
//       } else if (property.propertyName.length < 3 || property.propertyName.length > 100) {
//         newErrors.propertyName = 'Property name must be between 3 and 100 characters';
//       }

//       if (!property.propertyType) newErrors.propertyType = 'Property type cannot be blank';

//       if (property.propertyDescription && property.propertyDescription.length > 500) {
//         newErrors.propertyDescription = 'Description cannot exceed 500 characters';
//       }

//       if (property.propertyRating < 0 || property.propertyRating > 5) {
//         newErrors.propertyRating = 'Rating must be between 0 and 5';
//       }

//       if (property.propertyBasePrice < 0) {
//         newErrors.propertyBasePrice = 'Base price must be at least 0';
//       }
//     }

//     if (step === 2) {
//       if (!property.propertyEmail.trim()) {
//         newErrors.propertyEmail = 'Email cannot be blank';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(property.propertyEmail)) {
//         newErrors.propertyEmail = 'Invalid email format';
//       }

//       if (!property.propertyPassword) {
//         newErrors.propertyPassword = 'Password cannot be blank';
//       } else if (property.propertyPassword.length < 8) {
//         newErrors.propertyPassword = 'Password must be at least 8 characters long';
//       }

//       if (!property.propertyPhoneNumber) {
//         newErrors.propertyPhoneNumber = 'Phone number cannot be blank';
//       } else if (!/^\d{10}$/.test(property.propertyPhoneNumber)) {
//         newErrors.propertyPhoneNumber = 'Phone number must be exactly 10 digits';
//       }
//     }

//     if (step === 3) {
//       if (!property.propertyAddress.trim()) {
//         newErrors.propertyAddress = 'Address cannot be blank';
//       } else if (property.propertyAddress.length < 10 || property.propertyAddress.length > 255) {
//         newErrors.propertyAddress = 'Address must be between 10 and 255 characters';
//       }

//       if (!property.propertyCity) newErrors.propertyCity = 'City cannot be blank';
//       if (!property.propertyState) newErrors.propertyState = 'State cannot be blank';
//       if (!property.propertyCountry) newErrors.propertyCountry = 'Country cannot be blank';
//     }

//     if (step === 4) {
//       if (!property.propertyLicenseNumber) newErrors.propertyLicenseNumber = 'License number cannot be blank';
//       if (!licenseImage) newErrors.licenseImage = 'License image is required';
//     }

//     if (step === 5) {
//       if (!propertyImage1) newErrors.propertyImage1 = 'Image 1 is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateStep(5)) return;

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('propertyData', new Blob([JSON.stringify(property)], { type: 'application/json' }));
//     if (propertyImage1) formData.append('propertyImage1', propertyImage1);
//     if (propertyImage2) formData.append('propertyImage2', propertyImage2);
//     if (propertyImage3) formData.append('propertyImage3', propertyImage3);
//     if (licenseImage) formData.append('licenseImage', licenseImage);

//     try {
//       const response = await axios.post('http://192.168.1.7:8080/api/property/addProperty', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccessMessage('Property registered successfully!');
//       // Reset form
//       setProperty({
//         propertyName: '',
//         propertyAddress: '',
//         propertyEmail: '',
//         propertyPassword: '',
//         propertyPhoneNumber: '',
//         propertyType: '',
//         propertyDescription: '',
//         propertyRating: 0,
//         propertyCity: '',
//         propertyState: '',
//         propertyCountry: '',
//         propertyBasePrice: 0,
//         propertyLicenseNumber: '',
//         propertyInsuranceDetails: ''
//       });
//       setPropertyImage1(null);
//       setPropertyImage2(null);
//       setPropertyImage3(null);
//       setLicenseImage(null);
//       setCurrentStep(1);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: 'Failed to register property. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="property-registration-container">
//       <div className="registration-card">
//         <h1 className="registration-title">Property Registration</h1>
        
//         {successMessage && (
//           <div className="success-message">
//             <FaCheck className="success-icon" />
//             {successMessage}
//           </div>
//         )}
        
//         {errors.submit && (
//           <div className="error-message">
//             {errors.submit}
//           </div>
//         )}

//         {/* Progress Steps */}
//         <div className="progress-steps">
//           {steps.map((step) => (
//             <div 
//               key={step.id} 
//               className={`step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
//             >
//               <div className="step-icon">
//                 {currentStep > step.id ? <FaCheck /> : step.icon}
//               </div>
//               <div className="step-name">{step.name}</div>
//             </div>
//           ))}
//           <div className="progress-bar">
//             <div 
//               className="progress-fill" 
//               style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="property-form">
//           {/* Step 1: Basic Information */}
//           {currentStep === 1 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaBuilding className="section-icon" />
//                 Basic Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyName">Property Name*</label>
//                   <input
//                     type="text"
//                     id="propertyName"
//                     name="propertyName"
//                     value={property.propertyName}
//                     onChange={handleChange}
//                     className={errors.propertyName ? 'error' : ''}
//                     placeholder="Enter property name"
//                   />
//                   {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyType">Property Type*</label>
//                   <select
//                     id="propertyType"
//                     name="propertyType"
//                     value={property.propertyType}
//                     onChange={handleChange}
//                     className={errors.propertyType ? 'error' : ''}
//                   >
//                     <option value="">Select Property Type</option>
//                     <option value="Hotel">Hotel</option>
//                     <option value="Resort">Resort</option>
//                     <option value="Motel">Motel</option>
//                     <option value="Guest House">Guest House</option>
//                     <option value="Apartment">Apartment</option>
//                   </select>
//                   {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}
//                 </div>

//                 <div className="form-group full-width">
//                   <label htmlFor="propertyDescription">Description</label>
//                   <textarea
//                     id="propertyDescription"
//                     name="propertyDescription"
//                     value={property.propertyDescription}
//                     onChange={handleChange}
//                     rows="4"
//                     className={errors.propertyDescription ? 'error' : ''}
//                     placeholder="Describe your property (max 500 characters)"
//                   />
//                   {errors.propertyDescription && <span className="error-message">{errors.propertyDescription}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyRating">Rating (0-5)</label>
//                   <input
//                     type="number"
//                     id="propertyRating"
//                     name="propertyRating"
//                     value={property.propertyRating}
//                     onChange={handleChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className={errors.propertyRating ? 'error' : ''}
//                   />
//                   {errors.propertyRating && <span className="error-message">{errors.propertyRating}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyBasePrice">Base Price (per night)*</label>
//                   <div className="input-with-symbol">
//                     <span className="currency-symbol">$</span>
//                     <input
//                       type="number"
//                       id="propertyBasePrice"
//                       name="propertyBasePrice"
//                       value={property.propertyBasePrice}
//                       onChange={handleChange}
//                       min="0"
//                       step="0.01"
//                       className={errors.propertyBasePrice ? 'error' : ''}
//                     />
//                   </div>
//                   {errors.propertyBasePrice && <span className="error-message">{errors.propertyBasePrice}</span>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Contact Information */}
//           {currentStep === 2 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaEnvelope className="section-icon" />
//                 Contact Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyEmail">Email*</label>
//                   <input
//                     type="email"
//                     id="propertyEmail"
//                     name="propertyEmail"
//                     value={property.propertyEmail}
//                     onChange={handleChange}
//                     className={errors.propertyEmail ? 'error' : ''}
//                     placeholder="example@domain.com"
//                   />
//                   {errors.propertyEmail && <span className="error-message">{errors.propertyEmail}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyPassword">Password*</label>
//                   <input
//                     type="password"
//                     id="propertyPassword"
//                     name="propertyPassword"
//                     value={property.propertyPassword}
//                     onChange={handleChange}
//                     className={errors.propertyPassword ? 'error' : ''}
//                     placeholder="At least 8 characters"
//                   />
//                   {errors.propertyPassword && <span className="error-message">{errors.propertyPassword}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyPhoneNumber">Phone Number*</label>
//                   <input
//                     type="tel"
//                     id="propertyPhoneNumber"
//                     name="propertyPhoneNumber"
//                     value={property.propertyPhoneNumber}
//                     onChange={handleChange}
//                     className={errors.propertyPhoneNumber ? 'error' : ''}
//                     placeholder="10-digit number"
//                   />
//                   {errors.propertyPhoneNumber && <span className="error-message">{errors.propertyPhoneNumber}</span>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Location Information */}
//           {currentStep === 3 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaMapMarkerAlt className="section-icon" />
//                 Location Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group full-width">
//                   <label htmlFor="propertyAddress">Address*</label>
//                   <input
//                     type="text"
//                     id="propertyAddress"
//                     name="propertyAddress"
//                     value={property.propertyAddress}
//                     onChange={handleChange}
//                     className={errors.propertyAddress ? 'error' : ''}
//                     placeholder="Full street address"
//                   />
//                   {errors.propertyAddress && <span className="error-message">{errors.propertyAddress}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyCity">City*</label>
//                   <input
//                     type="text"
//                     id="propertyCity"
//                     name="propertyCity"
//                     value={property.propertyCity}
//                     onChange={handleChange}
//                     className={errors.propertyCity ? 'error' : ''}
//                   />
//                   {errors.propertyCity && <span className="error-message">{errors.propertyCity}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyState">State*</label>
//                   <input
//                     type="text"
//                     id="propertyState"
//                     name="propertyState"
//                     value={property.propertyState}
//                     onChange={handleChange}
//                     className={errors.propertyState ? 'error' : ''}
//                   />
//                   {errors.propertyState && <span className="error-message">{errors.propertyState}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyCountry">Country*</label>
//                   <input
//                     type="text"
//                     id="propertyCountry"
//                     name="propertyCountry"
//                     value={property.propertyCountry}
//                     onChange={handleChange}
//                     className={errors.propertyCountry ? 'error' : ''}
//                   />
//                   {errors.propertyCountry && <span className="error-message">{errors.propertyCountry}</span>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Legal Information */}
//           {currentStep === 4 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaFileAlt className="section-icon" />
//                 Legal Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyLicenseNumber">License Number*</label>
//                   <input
//                     type="text"
//                     id="propertyLicenseNumber"
//                     name="propertyLicenseNumber"
//                     value={property.propertyLicenseNumber}
//                     onChange={handleChange}
//                     className={errors.propertyLicenseNumber ? 'error' : ''}
//                   />
//                   {errors.propertyLicenseNumber && <span className="error-message">{errors.propertyLicenseNumber}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="licenseImage">License Image*</label>
//                   <div className="file-upload">
//                     <label className={errors.licenseImage ? 'error' : ''}>
//                       <input
//                         type="file"
//                         id="licenseImage"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setLicenseImage)}
//                       />
//                       {licenseImage ? licenseImage.name : 'Choose file...'}
//                     </label>
//                   </div>
//                   {errors.licenseImage && <span className="error-message">{errors.licenseImage}</span>}
//                 </div>

//                 <div className="form-group full-width">
//                   <label htmlFor="propertyInsuranceDetails">Insurance Details</label>
//                   <textarea
//                     id="propertyInsuranceDetails"
//                     name="propertyInsuranceDetails"
//                     value={property.propertyInsuranceDetails}
//                     onChange={handleChange}
//                     rows="3"
//                     placeholder="Optional insurance information"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 5: Property Images */}
//           {currentStep === 5 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaImages className="section-icon" />
//                 Property Images
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyImage1">Image 1*</label>
//                   <div className="file-upload">
//                     <label className={errors.propertyImage1 ? 'error' : ''}>
//                       <input
//                         type="file"
//                         id="propertyImage1"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setPropertyImage1)}
//                       />
//                       {propertyImage1 ? propertyImage1.name : 'Choose file...'}
//                     </label>
//                   </div>
//                   {errors.propertyImage1 && <span className="error-message">{errors.propertyImage1}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyImage2">Image 2</label>
//                   <div className="file-upload">
//                     <label>
//                       <input
//                         type="file"
//                         id="propertyImage2"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setPropertyImage2)}
//                       />
//                       {propertyImage2 ? propertyImage2.name : 'Choose file...'}
//                     </label>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyImage3">Image 3</label>
//                   <div className="file-upload">
//                     <label>
//                       <input
//                         type="file"
//                         id="propertyImage3"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setPropertyImage3)}
//                       />
//                       {propertyImage3 ? propertyImage3.name : 'Choose file...'}
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="form-navigation">
//             {currentStep > 1 && (
//               <button type="button" onClick={prevStep} className="nav-button prev-button">
//                 Previous
//               </button>
//             )}
            
//             {currentStep < steps.length ? (
//               <button type="button" onClick={nextStep} className="nav-button next-button">
//                 Next
//               </button>
//             ) : (
//               <button type="submit" disabled={isSubmitting} className="submit-button">
//                 {isSubmitting ? (
//                   <>
//                     <FaSpinner className="spinner" />
//                     Registering...
//                   </>
//                 ) : 'Register Property'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PropertyRegistration;



















// error showing outside the container 


// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaBuilding, FaEnvelope, FaMapMarkerAlt, FaFileAlt, FaImages, FaCheck, FaSpinner } from 'react-icons/fa';
// import '../styles/restoRegistration.css';

// const PropertyRegistration = () => {
//   const [property, setProperty] = useState({
//     propertyName: '',
//     propertyAddress: '',
//     propertyEmail: '',
//     propertyPassword: '',
//     propertyPhoneNumber: '',
//     propertyType: '',
//     propertyDescription: '',
//     propertyRating: 0,
//     propertyCity: '',
//     propertyState: '',
//     propertyCountry: '',
//     propertyBasePrice: 0,
//     propertyLicenseNumber: '',
//     propertyInsuranceDetails: ''
//   });

//   const [propertyImage1, setPropertyImage1] = useState(null);
//   const [propertyImage2, setPropertyImage2] = useState(null);
//   const [propertyImage3, setPropertyImage3] = useState(null);
//   const [licenseImage, setLicenseImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [currentStep, setCurrentStep] = useState(1);

//   const steps = [
//     { id: 1, name: 'Basic Info', icon: <FaBuilding /> },
//     { id: 2, name: 'Contact', icon: <FaEnvelope /> },
//     { id: 3, name: 'Location', icon: <FaMapMarkerAlt /> },
//     { id: 4, name: 'Legal', icon: <FaFileAlt /> },
//     { id: 5, name: 'Images', icon: <FaImages /> }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e, setImage) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const validateStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!property.propertyName.trim()) {
//         newErrors.propertyName = 'Property name cannot be blank';
//       } else if (property.propertyName.length < 3 || property.propertyName.length > 100) {
//         newErrors.propertyName = 'Property name must be between 3 and 100 characters';
//       }

//       if (!property.propertyType) newErrors.propertyType = 'Property type cannot be blank';

//       if (property.propertyDescription && property.propertyDescription.length > 500) {
//         newErrors.propertyDescription = 'Description cannot exceed 500 characters';
//       }

//       if (property.propertyRating < 0 || property.propertyRating > 5) {
//         newErrors.propertyRating = 'Rating must be between 0 and 5';
//       }

//       if (property.propertyBasePrice < 0) {
//         newErrors.propertyBasePrice = 'Base price must be at least 0';
//       }
//     }

//     if (step === 2) {
//       if (!property.propertyEmail.trim()) {
//         newErrors.propertyEmail = 'Email cannot be blank';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(property.propertyEmail)) {
//         newErrors.propertyEmail = 'Invalid email format';
//       }

//       if (!property.propertyPassword) {
//         newErrors.propertyPassword = 'Password cannot be blank';
//       } else if (property.propertyPassword.length < 8) {
//         newErrors.propertyPassword = 'Password must be at least 8 characters long';
//       }

//       if (!property.propertyPhoneNumber) {
//         newErrors.propertyPhoneNumber = 'Phone number cannot be blank';
//       } else if (!/^\d{10}$/.test(property.propertyPhoneNumber)) {
//         newErrors.propertyPhoneNumber = 'Phone number must be exactly 10 digits';
//       }
//     }

//     if (step === 3) {
//       if (!property.propertyAddress.trim()) {
//         newErrors.propertyAddress = 'Address cannot be blank';
//       } else if (property.propertyAddress.length < 10 || property.propertyAddress.length > 255) {
//         newErrors.propertyAddress = 'Address must be between 10 and 255 characters';
//       }

//       if (!property.propertyCity) newErrors.propertyCity = 'City cannot be blank';
//       if (!property.propertyState) newErrors.propertyState = 'State cannot be blank';
//       if (!property.propertyCountry) newErrors.propertyCountry = 'Country cannot be blank';
//     }

//     if (step === 4) {
//       if (!property.propertyLicenseNumber) newErrors.propertyLicenseNumber = 'License number cannot be blank';
//       if (!licenseImage) newErrors.licenseImage = 'License image is required';
//     }

//     if (step === 5) {
//       if (!propertyImage1) newErrors.propertyImage1 = 'Image 1 is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateStep(5)) return;

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append('propertyData', new Blob([JSON.stringify(property)], { type: 'application/json' }));
//     if (propertyImage1) formData.append('propertyImage1', propertyImage1);
//     if (propertyImage2) formData.append('propertyImage2', propertyImage2);
//     if (propertyImage3) formData.append('propertyImage3', propertyImage3);
//     if (licenseImage) formData.append('licenseImage', licenseImage);

//     try {
//       const response = await axios.post('http://192.168.1.7:8080/api/property/addProperty', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccessMessage('Property registered successfully!');
//       setProperty({
//         propertyName: '',
//         propertyAddress: '',
//         propertyEmail: '',
//         propertyPassword: '',
//         propertyPhoneNumber: '',
//         propertyType: '',
//         propertyDescription: '',
//         propertyRating: 0,
//         propertyCity: '',
//         propertyState: '',
//         propertyCountry: '',
//         propertyBasePrice: 0,
//         propertyLicenseNumber: '',
//         propertyInsuranceDetails: ''
//       });
//       setPropertyImage1(null);
//       setPropertyImage2(null);
//       setPropertyImage3(null);
//       setLicenseImage(null);
//       setCurrentStep(1);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: 'Failed to register property. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="property-registration-container">
//       <div className="registration-card">
//         <h1 className="registration-title">Property Registration</h1>
        
//         {successMessage && (
//           <div className="success-message">
//             <FaCheck className="success-icon" />
//             {successMessage}
//           </div>
//         )}
        
//         {errors.submit && (
//           <div className="error-message">
//             {errors.submit}
//           </div>
//         )}

//         {/* Progress Steps */}
//         <div className="progress-steps">
//           {steps.map((step) => (
//             <div 
//               key={step.id} 
//               className={`step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
//             >
//               <div className="step-icon">
//                 {currentStep > step.id ? <FaCheck /> : step.icon}
//               </div>
//               <div className="step-name">{step.name}</div>
//             </div>
//           ))}
//           <div className="progress-bar">
//             <div 
//               className="progress-fill" 
//               style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="property-form">
//           {/* Step 1: Basic Information */}
//           {currentStep === 1 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaBuilding className="section-icon" />
//                 Basic Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyName" className="required">Property Name*</label>
//                   <input
//                     type="text"
//                     id="propertyName"
//                     name="propertyName"
//                     value={property.propertyName}
//                     onChange={handleChange}
//                     className={errors.propertyName ? 'error' : ''}
//                     placeholder="Enter property name"
//                     aria-required="true"
//                   />
//                   {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyType" className="required">Property Type*</label>
//                   <select
//                     id="propertyType"
//                     name="propertyType"
//                     value={property.propertyType}
//                     onChange={handleChange}
//                     className={errors.propertyType ? 'error' : ''}
//                     aria-required="true"
//                   >
//                     <option value="">Select Property Type</option>
//                     <option value="Hotel">Hotel</option>
//                     <option value="Resort">Resort</option>
//                     <option value="Motel">Motel</option>
//                     <option value="Guest House">Guest House</option>
//                     <option value="Apartment">Apartment</option>
//                   </select>
//                   {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}
//                 </div>

//                 <div className="form-group full-width">
//                   <label htmlFor="propertyDescription">Description</label>
//                   <textarea
//                     id="propertyDescription"
//                     name="propertyDescription"
//                     value={property.propertyDescription}
//                     onChange={handleChange}
//                     rows="4"
//                     className={errors.propertyDescription ? 'error' : ''}
//                     placeholder="Describe your property (max 500 characters)"
//                   />
//                   {errors.propertyDescription && <span className="error-message">{errors.propertyDescription}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyRating">Rating (0-5)</label>
//                   <input
//                     type="number"
//                     id="propertyRating"
//                     name="propertyRating"
//                     value={property.propertyRating}
//                     onChange={handleChange}
//                     min="0"
//                     max="5"
//                     step="0.1"
//                     className={errors.propertyRating ? 'error' : ''}
//                   />
//                   {errors.propertyRating && <span className="error-message">{errors.propertyRating}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyBasePrice" className="required">Base Price (per night)*</label>
//                   <div className="input-with-symbol">
//                     <span className="currency-symbol">$</span>
//                     <input
//                       type="number"
//                       id="propertyBasePrice"
//                       name="propertyBasePrice"
//                       value={property.propertyBasePrice}
//                       onChange={handleChange}
//                       min="0"
//                       step="0.01"
//                       className={errors.propertyBasePrice ? 'error' : ''}
//                       aria-required="true"
//                     />
//                   </div>
//                   {errors.propertyBasePrice && <span className="error-message">{errors.propertyBasePrice}</span>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Contact Information */}
//           {currentStep === 2 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaEnvelope className="section-icon" />
//                 Contact Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyEmail" className="required">Email*</label>
//                   <input
//                     type="email"
//                     id="propertyEmail"
//                     name="propertyEmail"
//                     value={property.propertyEmail}
//                     onChange={handleChange}
//                     className={errors.propertyEmail ? 'error' : ''}
//                     placeholder="example@domain.com"
//                     aria-required="true"
//                   />
//                   {errors.propertyEmail && <span className="error-message">{errors.propertyEmail}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyPassword" className="required">Password*</label>
//                   <input
//                     type="password"
//                     id="propertyPassword"
//                     name="propertyPassword"
//                     value={property.propertyPassword}
//                     onChange={handleChange}
//                     className={errors.propertyPassword ? 'error' : ''}
//                     placeholder="At least 8 characters"
//                     aria-required="true"
//                   />
//                   {errors.propertyPassword && <span className="error-message">{errors.propertyPassword}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyPhoneNumber" className="required">Phone Number*</label>
//                   <input
//                     type="tel"
//                     id="propertyPhoneNumber"
//                     name="propertyPhoneNumber"
//                     value={property.propertyPhoneNumber}
//                     onChange={handleChange}
//                     className={errors.propertyPhoneNumber ? 'error' : ''}
//                     placeholder="10-digit number"
//                     aria-required="true"
//                   />
//                   {errors.propertyPhoneNumber && <span className="error-message">{errors.propertyPhoneNumber}</span>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Location Information */}
//           {currentStep === 3 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaMapMarkerAlt className="section-icon" />
//                 Location Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group full-width">
//                   <label htmlFor="propertyAddress" className="required">Address*</label>
//                   <input
//                     type="text"
//                     id="propertyAddress"
//                     name="propertyAddress"
//                     value={property.propertyAddress}
//                     onChange={handleChange}
//                     className={errors.propertyAddress ? 'error' : ''}
//                     placeholder="Full street address"
//                     aria-required="true"
//                   />
//                   {errors.propertyAddress && <span className="error-message">{errors.propertyAddress}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyCity" className="required">City*</label>
//                   <input
//                     type="text"
//                     id="propertyCity"
//                     name="propertyCity"
//                     value={property.propertyCity}
//                     onChange={handleChange}
//                     className={errors.propertyCity ? 'error' : ''}
//                     aria-required="true"
//                   />
//                   {errors.propertyCity && <span className="error-message">{errors.propertyCity}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyState" className="required">State*</label>
//                   <input
//                     type="text"
//                     id="propertyState"
//                     name="propertyState"
//                     value={property.propertyState}
//                     onChange={handleChange}
//                     className={errors.propertyState ? 'error' : ''}
//                     aria-required="true"
//                   />
//                   {errors.propertyState && <span className="error-message">{errors.propertyState}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyCountry" className="required">Country*</label>
//                   <input
//                     type="text"
//                     id="propertyCountry"
//                     name="propertyCountry"
//                     value={property.propertyCountry}
//                     onChange={handleChange}
//                     className={errors.propertyCountry ? 'error' : ''}
//                     aria-required="true"
//                   />
//                   {errors.propertyCountry && <span className="error-message">{errors.propertyCountry}</span>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 4: Legal Information */}
//           {currentStep === 4 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaFileAlt className="section-icon" />
//                 Legal Information
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyLicenseNumber" className="required">License Number*</label>
//                   <input
//                     type="text"
//                     id="propertyLicenseNumber"
//                     name="propertyLicenseNumber"
//                     value={property.propertyLicenseNumber}
//                     onChange={handleChange}
//                     className={errors.propertyLicenseNumber ? 'error' : ''}
//                     aria-required="true"
//                   />
//                   {errors.propertyLicenseNumber && <span className="error-message">{errors.propertyLicenseNumber}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="licenseImage" className="required">License Image*</label>
//                   <div className="file-upload">
//                     <label className={errors.licenseImage ? 'error' : ''}>
//                       <input
//                         type="file"
//                         id="licenseImage"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setLicenseImage)}
//                       />
//                       {licenseImage ? licenseImage.name : 'Choose file...'}
//                     </label>
//                   </div>
//                   {errors.licenseImage && <span className="error-message">{errors.licenseImage}</span>}
//                 </div>

//                 <div className="form-group full-width">
//                   <label htmlFor="propertyInsuranceDetails">Insurance Details</label>
//                   <textarea
//                     id="propertyInsuranceDetails"
//                     name="propertyInsuranceDetails"
//                     value={property.propertyInsuranceDetails}
//                     onChange={handleChange}
//                     rows="3"
//                     placeholder="Optional insurance information"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 5: Property Images */}
//           {currentStep === 5 && (
//             <div className="form-step">
//               <h2 className="form-section-title">
//                 <FaImages className="section-icon" />
//                 Property Images
//               </h2>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label htmlFor="propertyImage1" className="required">Image 1*</label>
//                   <div className="file-upload">
//                     <label className={errors.propertyImage1 ? 'error' : ''}>
//                       <input
//                         type="file"
//                         id="propertyImage1"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setPropertyImage1)}
//                       />
//                       {propertyImage1 ? propertyImage1.name : 'Choose file...'}
//                     </label>
//                   </div>
//                   {errors.propertyImage1 && <span className="error-message">{errors.propertyImage1}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyImage2">Image 2</label>
//                   <div className="file-upload">
//                     <label>
//                       <input
//                         type="file"
//                         id="propertyImage2"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setPropertyImage2)}
//                       />
//                       {propertyImage2 ? propertyImage2.name : 'Choose file...'}
//                     </label>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="propertyImage3">Image 3</label>
//                   <div className="file-upload">
//                     <label>
//                       <input
//                         type="file"
//                         id="propertyImage3"
//                         accept="image/*"
//                         onChange={(e) => handleImageChange(e, setPropertyImage3)}
//                       />
//                       {propertyImage3 ? propertyImage3.name : 'Choose file...'}
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="form-navigation">
//             {currentStep > 1 && (
//               <button type="button" onClick={prevStep} className="nav-button prev-button">
//                 Previous
//               </button>
//             )}
            
//             {currentStep < steps.length ? (
//               <button type="button" onClick={nextStep} className="nav-button next-button">
//                 Next
//               </button>
//             ) : (
//               <button type="submit" disabled={isSubmitting} className="submit-button">
//                 {isSubmitting ? (
//                   <>
//                     <FaSpinner className="spinner" />
//                     Registering...
//                   </>
//                 ) : 'Register Property'}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PropertyRegistration;













import React, { useState } from 'react';
import axios from 'axios';
import { FaBuilding, FaEnvelope, FaMapMarkerAlt, FaFileAlt, FaImages, FaCheck, FaSpinner } from 'react-icons/fa';
import '../styles/restoRegistration.css';

const ImagePreview = ({ image }) => {
  return image ? (
    <img
      src={URL.createObjectURL(image)}
      alt="Preview"
      className="image-preview"
    />
  ) : null;
};

const PropertyRegistration = () => {
  const [property, setProperty] = useState({
    propertyName: '',
    propertyAddress: '',
    propertyEmail: '',
    propertyPassword: '',
    propertyPhoneNumber: '',
    propertyType: '',
    propertyDescription: '',
    propertyRating: 0,
    propertyCity: '',
    propertyState: '',
    propertyCountry: '',
    propertyBasePrice: 0,
    propertyLicenseNumber: '',
    propertyInsuranceDetails: ''
  });

  const [propertyImage1, setPropertyImage1] = useState(null);
  const [propertyImage2, setPropertyImage2] = useState(null);
  const [propertyImage3, setPropertyImage3] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: 'Basic Info', icon: <FaBuilding /> },
    { id: 2, name: 'Contact', icon: <FaEnvelope /> },
    { id: 3, name: 'Location', icon: <FaMapMarkerAlt /> },
    { id: 4, name: 'Legal', icon: <FaFileAlt /> },
    { id: 5, name: 'Images', icon: <FaImages /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, setImage) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!property.propertyName.trim()) {
        newErrors.propertyName = 'Property name cannot be blank';
      } else if (property.propertyName.length < 3 || property.propertyName.length > 100) {
        newErrors.propertyName = 'Property name must be between 3 and 100 characters';
      }

      if (!property.propertyType) newErrors.propertyType = 'Property type cannot be blank';

      if (property.propertyDescription && property.propertyDescription.length > 500) {
        newErrors.propertyDescription = 'Description cannot exceed 500 characters';
      }

      if (property.propertyRating < 0 || property.propertyRating > 5) {
        newErrors.propertyRating = 'Rating must be between 0 and 5';
      }

      if (property.propertyBasePrice < 0) {
        newErrors.propertyBasePrice = 'Base price must be at least 0';
      }
    }

    if (step === 2) {
      if (!property.propertyEmail.trim()) {
        newErrors.propertyEmail = 'Email cannot be blank';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(property.propertyEmail)) {
        newErrors.propertyEmail = 'Invalid email format';
      }

      if (!property.propertyPassword) {
        newErrors.propertyPassword = 'Password cannot be blank';
      } else if (property.propertyPassword.length < 8) {
        newErrors.propertyPassword = 'Password must be at least 8 characters long';
      }

      if (!property.propertyPhoneNumber) {
        newErrors.propertyPhoneNumber = 'Phone number cannot be blank';
      } else if (!/^\d{10}$/.test(property.propertyPhoneNumber)) {
        newErrors.propertyPhoneNumber = 'Phone number must be exactly 10 digits';
      }
    }

    if (step === 3) {
      if (!property.propertyAddress.trim()) {
        newErrors.propertyAddress = 'Address cannot be blank';
      } else if (property.propertyAddress.length < 10 || property.propertyAddress.length > 255) {
        newErrors.propertyAddress = 'Address must be between 10 and 255 characters';
      }

      if (!property.propertyCity) newErrors.propertyCity = 'City cannot be blank';
      if (!property.propertyState) newErrors.propertyState = 'State cannot be blank';
      if (!property.propertyCountry) newErrors.propertyCountry = 'Country cannot be blank';
    }

    if (step === 4) {
      if (!property.propertyLicenseNumber) newErrors.propertyLicenseNumber = 'License number cannot be blank';
      if (!licenseImage) newErrors.licenseImage = 'License image is required';
    }

    if (step === 5) {
      if (!propertyImage1) newErrors.propertyImage1 = 'Image 1 is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('propertyData', new Blob([JSON.stringify(property)], { type: 'application/json' }));
    if (propertyImage1) formData.append('propertyImage1', propertyImage1);
    if (propertyImage2) formData.append('propertyImage2', propertyImage2);
    if (propertyImage3) formData.append('propertyImage3', propertyImage3);
    if (licenseImage) formData.append('licenseImage', licenseImage);

    try {
      const response = await axios.post('http://192.168.1.8:8080/api/property/addProperty', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Property registered successfully!');
      setProperty({
        propertyName: '',
        propertyAddress: '',
        propertyEmail: '',
        propertyPassword: '',
        propertyPhoneNumber: '',
        propertyType: '',
        propertyDescription: '',
        propertyRating: 0,
        propertyCity: '',
        propertyState: '',
        propertyCountry: '',
        propertyBasePrice: 0,
        propertyLicenseNumber: '',
        propertyInsuranceDetails: ''
      });
      setPropertyImage1(null);
      setPropertyImage2(null);
      setPropertyImage3(null);
      setLicenseImage(null);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to register property. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="property-registration-container">
      <div className="registration-card">
        <h1 className="registration-title">Property Registration</h1>
        
        {successMessage && (
          <div className="success-message">
            <FaCheck className="success-icon" />
            {successMessage}
          </div>
        )}
        
        {errors.submit && (
          <div className="error-message submit-error">
            {errors.submit}
          </div>
        )}

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            >
              <div className="step-icon">
                {currentStep > step.id ? <FaCheck /> : step.icon}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          ))}
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2 className="form-section-title">
                <FaBuilding className="section-icon" />
                Basic Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="propertyName" className="required">Property Name</label>
                  <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    value={property.propertyName}
                    onChange={handleChange}
                    className={errors.propertyName ? 'error' : ''}
                    placeholder="Enter property name"
                    aria-required="true"
                    aria-describedby={errors.propertyName ? "propertyName-error" : undefined}
                  />
                  {errors.propertyName && <span id="propertyName-error" className="error-message">{errors.propertyName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyType" className="required">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={property.propertyType}
                    onChange={handleChange}
                    className={errors.propertyType ? 'error' : ''}
                    aria-required="true"
                    aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
                  >
                    <option value="">Select Property Type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Motel">Motel</option>
                    <option value="Guest House">Guest House</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                  {errors.propertyType && <span id="propertyType-error" className="error-message">{errors.propertyType}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="propertyDescription">Description</label>
                  <textarea
                    id="propertyDescription"
                    name="propertyDescription"
                    value={property.propertyDescription}
                    onChange={handleChange}
                    rows="4"
                    className={errors.propertyDescription ? 'error' : ''}
                    placeholder="Describe your property (max 500 characters)"
                    aria-describedby={errors.propertyDescription ? "propertyDescription-error" : undefined}
                  />
                  {errors.propertyDescription && <span id="propertyDescription-error" className="error-message">{errors.propertyDescription}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyRating">Rating (0-5)</label>
                  <input
                    type="number"
                    id="propertyRating"
                    name="propertyRating"
                    value={property.propertyRating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className={errors.propertyRating ? 'error' : ''}
                    aria-describedby={errors.propertyRating ? "propertyRating-error" : undefined}
                  />
                  {errors.propertyRating && <span id="propertyRating-error" className="error-message">{errors.propertyRating}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyBasePrice" className="required">Base Price (per night)</label>
                  <div className="input-with-symbol">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      id="propertyBasePrice"
                      name="propertyBasePrice"
                      value={property.propertyBasePrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={errors.propertyBasePrice ? 'error' : ''}
                      aria-required="true"
                      aria-describedby={errors.propertyBasePrice ? "propertyBasePrice-error" : undefined}
                    />
                  </div>
                  {errors.propertyBasePrice && <span id="propertyBasePrice-error" className="error-message">{errors.propertyBasePrice}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2 className="form-section-title">
                <FaEnvelope className="section-icon" />
                Contact Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="propertyEmail" className="required">Email</label>
                  <input
                    type="email"
                    id="propertyEmail"
                    name="propertyEmail"
                    value={property.propertyEmail}
                    onChange={handleChange}
                    className={errors.propertyEmail ? 'error' : ''}
                    placeholder="example@domain.com"
                    aria-required="true"
                    aria-describedby={errors.propertyEmail ? "propertyEmail-error" : undefined}
                  />
                  {errors.propertyEmail && <span id="propertyEmail-error" className="error-message">{errors.propertyEmail}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyPassword" className="required">Password</label>
                  <input
                    type="password"
                    id="propertyPassword"
                    name="propertyPassword"
                    value={property.propertyPassword}
                    onChange={handleChange}
                    className={errors.propertyPassword ? 'error' : ''}
                    placeholder="At least 8 characters"
                    aria-required="true"
                    aria-describedby={errors.propertyPassword ? "propertyPassword-error" : undefined}
                  />
                  {errors.propertyPassword && <span id="propertyPassword-error" className="error-message">{errors.propertyPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyPhoneNumber" className="required">Phone Number</label>
                  <input
                    type="tel"
                    id="propertyPhoneNumber"
                    name="propertyPhoneNumber"
                    value={property.propertyPhoneNumber}
                    onChange={handleChange}
                    className={errors.propertyPhoneNumber ? 'error' : ''}
                    placeholder="10-digit number"
                    aria-required="true"
                    aria-describedby={errors.propertyPhoneNumber ? "propertyPhoneNumber-error" : undefined}
                  />
                  {errors.propertyPhoneNumber && <span id="propertyPhoneNumber-error" className="error-message">{errors.propertyPhoneNumber}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location Information */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2 className="form-section-title">
                <FaMapMarkerAlt className="section-icon" />
                Location Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="propertyAddress" className="required">Address</label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={property.propertyAddress}
                    onChange={handleChange}
                    className={errors.propertyAddress ? 'error' : ''}
                    placeholder="Full street address"
                    aria-required="true"
                    aria-describedby={errors.propertyAddress ? "propertyAddress-error" : undefined}
                  />
                  {errors.propertyAddress && <span id="propertyAddress-error" className="error-message">{errors.propertyAddress}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyCity" className="required">City</label>
                  <input
                    type="text"
                    id="propertyCity"
                    name="propertyCity"
                    value={property.propertyCity}
                    onChange={handleChange}
                    className={errors.propertyCity ? 'error' : ''}
                    aria-required="true"
                    aria-describedby={errors.propertyCity ? "propertyCity-error" : undefined}
                  />
                  {errors.propertyCity && <span id="propertyCity-error" className="error-message">{errors.propertyCity}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyState" className="required">State</label>
                  <input
                    type="text"
                    id="propertyState"
                    name="propertyState"
                    value={property.propertyState}
                    onChange={handleChange}
                    className={errors.propertyState ? 'error' : ''}
                    aria-required="true"
                    aria-describedby={errors.propertyState ? "propertyState-error" : undefined}
                  />
                  {errors.propertyState && <span id="propertyState-error" className="error-message">{errors.propertyState}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyCountry" className="required">Country</label>
                  <input
                    type="text"
                    id="propertyCountry"
                    name="propertyCountry"
                    value={property.propertyCountry}
                    onChange={handleChange}
                    className={errors.propertyCountry ? 'error' : ''}
                    aria-required="true"
                    aria-describedby={errors.propertyCountry ? "propertyCountry-error" : undefined}
                  />
                  {errors.propertyCountry && <span id="propertyCountry-error" className="error-message">{errors.propertyCountry}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Legal Information */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2 className="form-section-title">
                <FaFileAlt className="section-icon" />
                Legal Information
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="propertyLicenseNumber" className="required">License Number</label>
                  <input
                    type="text"
                    id="propertyLicenseNumber"
                    name="propertyLicenseNumber"
                    value={property.propertyLicenseNumber}
                    onChange={handleChange}
                    className={errors.propertyLicenseNumber ? 'error' : ''}
                    aria-required="true"
                    aria-describedby={errors.propertyLicenseNumber ? "propertyLicenseNumber-error" : undefined}
                  />
                  {errors.propertyLicenseNumber && <span id="propertyLicenseNumber-error" className="error-message">{errors.propertyLicenseNumber}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="licenseImage" className="required">License Image</label>
                  <div className="file-upload">
                    <label className={errors.licenseImage ? 'error' : ''}>
                      <input
                        type="file"
                        id="licenseImage"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setLicenseImage)}
                      />
                      {licenseImage ? licenseImage.name : 'Choose file...'}
                    </label>
                  </div>
                  <ImagePreview image={licenseImage} />
                  {errors.licenseImage && <span id="licenseImage-error" className="error-message">{errors.licenseImage}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="propertyInsuranceDetails">Insurance Details</label>
                  <textarea
                    id="propertyInsuranceDetails"
                    name="propertyInsuranceDetails"
                    value={property.propertyInsuranceDetails}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Optional insurance information"
                    aria-describedby={errors.propertyInsuranceDetails ? "propertyInsuranceDetails-error" : undefined}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Property Images */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2 className="form-section-title">
                <FaImages className="section-icon" />
                Property Images
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="propertyImage1" className="required">Image 1</label>
                  <div className="file-upload">
                    <label className={errors.propertyImage1 ? 'error' : ''}>
                      <input
                        type="file"
                        id="propertyImage1"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setPropertyImage1)}
                      />
                      {propertyImage1 ? propertyImage1.name : 'Choose file...'}
                    </label>
                  </div>
                  <ImagePreview image={propertyImage1} />
                  {errors.propertyImage1 && <span id="propertyImage1-error" className="error-message">{errors.propertyImage1}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="propertyImage2">Image 2</label>
                  <div className="file-upload">
                    <label>
                      <input
                        type="file"
                        id="propertyImage2"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setPropertyImage2)}
                      />
                      {propertyImage2 ? propertyImage2.name : 'Choose file...'}
                    </label>
                  </div>
                  <ImagePreview image={propertyImage2} />
                </div>

                <div className="form-group">
                  <label htmlFor="propertyImage3">Image 3</label>
                  <div className="file-upload">
                    <label>
                      <input
                        type="file"
                        id="propertyImage3"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, setPropertyImage3)}
                      />
                      {propertyImage3 ? propertyImage3.name : 'Choose file...'}
                    </label>
                  </div>
                  <ImagePreview image={propertyImage3} />
                </div>
              </div>
            </div>
          )}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="nav-button prev-button">
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button type="button" onClick={nextStep} className="nav-button next-button">
                Next
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? (
                  <>
                    <FaSpinner className="spinner" />
                    Registering...
                  </>
                ) : 'Register Property'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyRegistration;
