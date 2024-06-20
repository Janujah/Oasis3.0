// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import {jwtDecode} from 'jwt-decode';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function BookingForm() {
//     const router = useRouter();
//     const [currentPage, setCurrentPage] = useState(1);
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         doctorName: '',
//         preferredDate: '',
//         preferredTime: '',
//         fullName: '',
//         dob: '',
//         gender: '',
//         email: '',
//         phone: '',
//         consultationReason: '',
//         preferredLanguage: '',
//         visitedBefore: '',
//         consent: false,
//         doctorId: ''
//     });

//     useEffect(() => {
//         const token = localStorage.getItem('auth-token');
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             if (decodedToken) {
//                 setFormData(prev => ({
//                     ...prev,
//                     fullName: decodedToken.userName || '',
//                     email: decodedToken.email || ''
//                 }));
//             }
//         }
//     }, []);





//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         let isValid = true;

//         if (!formData.fullName.trim()) {
//             isValid = false;
//             newErrors.fullName = 'Full name is required.';
//         }
//         if (!formData.dob) {
//             isValid = false;
//             newErrors.dob = 'Date of birth is required.';
//         }
//         if (!formData.gender) {
//             isValid = false;
//             newErrors.gender = 'Gender is required.';
//         }
//         if (!formData.email) {
//             isValid = false;
//             newErrors.email = 'Email address is required.';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             isValid = false;
//             newErrors.email = 'Email address is invalid.';
//         }
//         if (!formData.phone) {
//             isValid = false;
//             newErrors.phone = 'Phone number is required.';
//         } else if (!/^\d{10}$/.test(formData.phone)) {
//             isValid = false;
//             newErrors.phone = 'Phone number must be 10 digits.';
//         }
//         if (!formData.consultationReason.trim()) {
//             isValid = false;
//             newErrors.consultationReason = 'Reason for consultation is required.';
//         }
//         if (!formData.preferredDate) {
//             isValid = false;
//             newErrors.preferredDate = 'Preferred date of consultation is required.';
//         }
//         if (!formData.preferredTime) {
//             isValid = false;
//             newErrors.preferredTime = 'Preferred time slot is required.';
//         }
//         if (!formData.preferredLanguage) {
//             isValid = false;
//             newErrors.preferredLanguage = 'Preferred language is required.';
//         }
//         if (!formData.visitedBefore) {
//             isValid = false;
//             newErrors.visitedBefore = 'Please indicate if you have visited us before.';
//         }
//         if (!formData.consent) {
//             isValid = false;
//             newErrors.consent = 'You must give your consent to proceed.';
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
//             return;
//         }

//         try {
//             const response = await fetch('https://oasis-final-directory.onrender.com/consult/create', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 toast.success('Appointment booked successfully!', { position: 'bottom-right' });
//                 router.push('/');
//             } else {
//                 throw new Error('Form submission failed');
//             }
//         } catch (error) {
//             toast.error('Form submission failed. Please try again.', { position: 'bottom-right' });
//             console.error(error);
//         }
//     };

//     const renderFormPart = () => {
//         switch (currentPage) {
//             case 1:
//                 return (
//                     <div>
//                         <div className="mb-4">
//                             <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">Doctors Name</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="doctorName"
//                                 name="doctorName"
//                                 value={formData.doctorName}
//                                 onChange={handleChange}
//                                 disabled
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Preferred Date</label>
//                             <input
//                                 type="date"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="preferredDate"
//                                 name="preferredDate"
//                                 value={formData.preferredDate}
//                                 onChange={handleChange}
//                             />
//                             {errors.preferredDate && <small className="text-red-500">{errors.preferredDate}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">Preferred Time</label>
//                             <input
//                                 type="time"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="preferredTime"
//                                 name="preferredTime"
//                                 value={formData.preferredTime}
//                                 onChange={handleChange}
//                             />
//                             {errors.preferredTime && <small className="text-red-500">{errors.preferredTime}</small>}
//                         </div>
//                     </div>
//                 );
//             case 2:
//                 return (
//                     <>
//                         <div className="mb-4">
//                             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="fullName"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                             />
//                             {errors.fullName && <small className="text-red-500">{errors.fullName}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
//                             <input
//                                 type="date"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="dob"
//                                 name="dob"
//                                 value={formData.dob}
//                                 onChange={handleChange}
//                             />
//                             {errors.dob && <small className="text-red-500">{errors.dob}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
//                             <select
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="gender"
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                             {errors.gender && <small className="text-red-500">{errors.gender}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                             {errors.email && <small className="text-red-500">{errors.email}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="phone"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                             />
//                             {errors.phone && <small className="text-red-500">{errors.phone}</small>}
//                         </div>
//                     </>
//                 );
//             case 3:
//                 return (
//                     <>
//                         <div className="mb-4">
//                             <label htmlFor="consultationReason" className="block text-sm font-medium text-gray-700">Reason for Consultation</label>
//                             <textarea
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="consultationReason"
//                                 name="consultationReason"
//                                 value={formData.consultationReason}
//                                 onChange={handleChange}
//                             />
//                             {errors.consultationReason && <small className="text-red-500">{errors.consultationReason}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700">Preferred Language</label>
//                             <input
//                                 type="text"
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="preferredLanguage"
//                                 name="preferredLanguage"
//                                 value={formData.preferredLanguage}
//                                 onChange={handleChange}
//                             />
//                             {errors.preferredLanguage && <small className="text-red-500">{errors.preferredLanguage}</small>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="visitedBefore" className="block text-sm font-medium text-gray-700">Have you visited us before?</label>
//                             <select
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 id="visitedBefore"
//                                 name="visitedBefore"
//                                 value={formData.visitedBefore}
//                                 onChange={handleChange}
//                             >
//                                 <option value="">Select an option</option>
//                                 <option value="yes">Yes</option>
//                                 <option value="no">No</option>
//                             </select>
//                             {errors.visitedBefore && <small className="text-red-500">{errors.visitedBefore}</small>}
//                         </div>
//                         <div className="mb-4 flex items-start">
//                             <div className="flex items-center h-5">
//                                 <input
//                                     type="checkbox"
//                                     className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
//                                     id="consent"
//                                     name="consent"
//                                     checked={formData.consent}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="ml-3 text-sm">
//                                 <label htmlFor="consent" className="font-medium text-gray-700">
//                                     I consent to the collection and processing of my personal data.
//                                 </label>
//                                 {errors.consent && <small className="text-red-500">{errors.consent}</small>}
//                             </div>
//                         </div>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
//             <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
//             <form onSubmit={handleFormSubmit}>
//                 {renderFormPart()}
//                 <div className="flex justify-between mt-4">
//                     {currentPage > 1 && (
//                         <button
//                             type="button"
//                             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                             onClick={() => setCurrentPage(currentPage - 1)}
//                         >
//                             Previous
//                         </button>
//                     )}
//                     {currentPage < 3 ? (
//                         <button
//                             type="button"
//                             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//                             onClick={() => setCurrentPage(currentPage + 1)}
//                         >
//                             Next
//                         </button>
//                     ) : (
//                         <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
//                             Submit
//                         </button>
//                     )}
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default BookingForm;



// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import {jwtDecode} from 'jwt-decode';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function BookingForm() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const doctorData = JSON.parse(searchParams.get('doctorData') || '{}');

//     const [currentPage, setCurrentPage] = useState(1);
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         doctorName: doctorData.doctorName || '',
//         preferredDate: '',
//         preferredTime: doctorData.availability?.time || '',
//         fullName: '',
//         dob: '',
//         gender: '',
//         email: '',
//         phone: '',
//         consultationReason: '',
//         preferredLanguage: '',
//         visitedBefore: '',
//         consent: false,
//         doctorId: doctorData.doctorId || ''
//     });

//     useEffect(() => {
//         const token = localStorage.getItem('auth-token');
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             if (decodedToken) {
//                 setFormData(prev => ({
//                     ...prev,
//                     fullName: decodedToken.userName || '',
//                     email: decodedToken.email || ''
//                 }));
//             }
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validateForm = (page) => {
//         let newErrors = {};
//         let isValid = true;

//         if (page === 1) {
//             if (!formData.preferredDate) {
//                 isValid = false;
//                 newErrors.preferredDate = 'Preferred date of consultation is required.';
//             }
//         }

//         if (page === 2) {
//             if (!formData.fullName.trim()) {
//                 isValid = false;
//                 newErrors.fullName = 'Full name is required.';
//             }
//             if (!formData.dob) {
//                 isValid = false;
//                 newErrors.dob = 'Date of birth is required.';
//             }
//             if (!formData.gender) {
//                 isValid = false;
//                 newErrors.gender = 'Gender is required.';
//             }
//             if (!formData.email) {
//                 isValid = false;
//                 newErrors.email = 'Email address is required.';
//             } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//                 isValid = false;
//                 newErrors.email = 'Email address is invalid.';
//             }
//             if (!formData.phone) {
//                 isValid = false;
//                 newErrors.phone = 'Phone number is required.';
//             } else if (!/^\d{10}$/.test(formData.phone)) {
//                 isValid = false;
//                 newErrors.phone = 'Phone number must be 10 digits.';
//             }
//         }

//         if (page === 3) {
//             if (!formData.consultationReason.trim()) {
//                 isValid = false;
//                 newErrors.consultationReason = 'Reason for consultation is required.';
//             }
//             if (!formData.preferredLanguage) {
//                 isValid = false;
//                 newErrors.preferredLanguage = 'Preferred language is required.';
//             } else if (!['English', 'Spanish', 'Other'].includes(formData.preferredLanguage)) {
//                 isValid = false;
//                 newErrors.preferredLanguage = 'Preferred language must be one of the following: English, Spanish, Other.';
//             }
//             if (!formData.visitedBefore) {
//                 isValid = false;
//                 newErrors.visitedBefore = 'Please indicate if you have visited us before.';
//             }
//             if (!formData.consent) {
//                 isValid = false;
//                 newErrors.consent = 'You must give your consent to proceed.';
//             }
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const handleNext = () => {
//         if (validateForm(currentPage)) {
//             setCurrentPage(prev => prev + 1);
//         } else {
//             toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm(currentPage)) {
//             toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
//             return;
//         }

//         try {
//             const response = await fetch('https://oasis-final-directory.onrender.com/consult/create', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 toast.success('Appointment booked successfully!', { position: 'bottom-right' });
//                 router.push('/');
//             } else {
//                 throw new Error('Form submission failed');
//             }
//         } catch (error) {
//             toast.error('Form submission failed. Please try again.', { position: 'bottom-right' });
//             console.error(error);
//         }
//     };

//     const renderFormPart = () => {
//         switch (currentPage) {
//             case 1:
//                 return (
//                     <div>
//                         <div className="mb-4">
//                             <label htmlFor="doctorName" className="block text-gray-700">Doctor Name:</label>
//                             <input
//                                 type="text"
//                                 id="doctorName"
//                                 name="doctorName"
//                                 value={formData.doctorName}
//                                 onChange={handleChange}
//                                 disabled
//                                 className={`w-full px-4 py-2 border ${errors.doctorName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.doctorName && <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="preferredDate" className="block text-gray-700">Preferred Date:</label>
//                             <input
//                                 type="date"
//                                 id="preferredDate"
//                                 name="preferredDate"
//                                 value={formData.preferredDate}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="preferredTime" className="block text-gray-700">Preferred Time:</label>
//                             <input
//                                 type="text"
//                                 id="preferredTime"
//                                 name="preferredTime"
//                                 value={formData.preferredTime}
//                                 onChange={handleChange}
//                                 disabled
//                                 className={`w-full px-4 py-2 border ${errors.preferredTime ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
//                         </div>
//                         <div className="flex justify-between">
//                             <button
//                                 type="button"
//                                 onClick={handleNext}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 2:
//                 return (
//                     <div>
//                         <div className="mb-4">
//                             <label htmlFor="fullName" className="block text-gray-700">Full Name:</label>
//                             <input
//                                 type="text"
//                                 id="fullName"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="dob" className="block text-gray-700">Date of Birth:</label>
//                             <input
//                                 type="date"
//                                 id="dob"
//                                 name="dob"
//                                 value={formData.dob}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="gender" className="block text-gray-700">Gender:</label>
//                             <select
//                                 id="gender"
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             >
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                             {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-gray-700">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="phone" className="block text-gray-700">Phone:</label>
//                             <input
//                                 type="text"
//                                 id="phone"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                         </div>
//                         <div className="flex justify-between">
//                             <button
//                                 type="button"
//                                 onClick={() => setCurrentPage(1)}
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleNext}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 );
//             case 3:
//                 return (
//                     <div>
//                         <div className="mb-4">
//                             <label htmlFor="consultationReason" className="block text-gray-700">Reason for Consultation:</label>
//                             <textarea
//                                 id="consultationReason"
//                                 name="consultationReason"
//                                 value={formData.consultationReason}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.consultationReason ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             />
//                             {errors.consultationReason && <p className="text-red-500 text-sm mt-1">{errors.consultationReason}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="preferredLanguage" className="block text-gray-700">Preferred Language:</label>
//                             <select
//                                 id="preferredLanguage"
//                                 name="preferredLanguage"
//                                 value={formData.preferredLanguage}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             >
//                                 <option value="">Select Language</option>
//                                 <option value="English">English</option>
//                                 <option value="Spanish">Spanish</option>
//                                 <option value="Other">Other</option>
//                             </select>
//                             {errors.preferredLanguage && <p className="text-red-500 text-sm mt-1">{errors.preferredLanguage}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="visitedBefore" className="block text-gray-700">Have you visited us before?</label>
//                             <select
//                                 id="visitedBefore"
//                                 name="visitedBefore"
//                                 value={formData.visitedBefore}
//                                 onChange={handleChange}
//                                 className={`w-full px-4 py-2 border ${errors.visitedBefore ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//                             >
//                                 <option value="">Select an option</option>
//                                 <option value="yes">Yes</option>
//                                 <option value="no">No</option>
//                             </select>
//                             {errors.visitedBefore && <p className="text-red-500 text-sm mt-1">{errors.visitedBefore}</p>}
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="consent" className="block text-gray-700">Consent:</label>
//                             <input
//                                 type="checkbox"
//                                 id="consent"
//                                 name="consent"
//                                 checked={formData.consent}
//                                 onChange={handleChange}
//                                 className="mr-2"
//                             />
//                             <span>I agree to the terms and conditions</span>
//                             {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
//                         </div>
//                         <div className="flex justify-between">
//                             <button
//                                 type="button"
//                                 onClick={() => setCurrentPage(2)}
//                                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
//                             >
//                                 Previous
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
//             <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
//                 <h1 className="text-2xl font-bold text-center mb-6">Book an Appointment</h1>
//                 <form onSubmit={handleFormSubmit}>
//                     {renderFormPart()}
//                 </form>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }

// export default BookingForm;




"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';

const stripePromise = loadStripe('your_stripe_public_key_here');

function BookingForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorData = JSON.parse(searchParams.get('doctorData') || '{}');

    const [currentPage, setCurrentPage] = useState(1);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        doctorName: doctorData.doctorName || '',
        preferredDate: '',
        preferredTime: doctorData.availability?.time || '',
        fullName: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        consultationReason: '',
        preferredLanguage: '',
        visitedBefore: '',
        consent: false,
        doctorId: doctorData.doctorId || '',
        fees: doctorData.fees || 0  // Initialize fees from doctorData
    });

    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken) {
                setFormData(prev => ({
                    ...prev,
                    fullName: decodedToken.userName || '',
                    email: decodedToken.email || ''
                }));
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = (page) => {
        let newErrors = {};
        let isValid = true;

        if (page === 1) {
            if (!formData.preferredDate) {
                isValid = false;
                newErrors.preferredDate = 'Preferred date of consultation is required.';
            }
        }

        if (page === 2) {
            if (!formData.fullName.trim()) {
                isValid = false;
                newErrors.fullName = 'Full name is required.';
            }
            if (!formData.dob) {
                isValid = false;
                newErrors.dob = 'Date of birth is required.';
            }
            if (!formData.gender) {
                isValid = false;
                newErrors.gender = 'Gender is required.';
            }
            if (!formData.email) {
                isValid = false;
                newErrors.email = 'Email address is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                isValid = false;
                newErrors.email = 'Email address is invalid.';
            }
            if (!formData.phone) {
                isValid = false;
                newErrors.phone = 'Phone number is required.';
            } else if (!/^\d{10}$/.test(formData.phone)) {
                isValid = false;
                newErrors.phone = 'Phone number must be 10 digits.';
            }
        }

        if (page === 3) {
            if (!formData.consultationReason.trim()) {
                isValid = false;
                newErrors.consultationReason = 'Reason for consultation is required.';
            }
            if (!formData.preferredLanguage) {
                isValid = false;
                newErrors.preferredLanguage = 'Preferred language is required.';
            } else if (!['English', 'Spanish', 'Other'].includes(formData.preferredLanguage)) {
                isValid = false;
                newErrors.preferredLanguage = 'Preferred language must be one of the following: English, Spanish, Other.';
            }
            if (!formData.visitedBefore) {
                isValid = false;
                newErrors.visitedBefore = 'Please indicate if you have visited us before.';
            }
            if (!formData.consent) {
                isValid = false;
                newErrors.consent = 'You must give your consent to proceed.';
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateForm(currentPage)) {
            setCurrentPage(prev => prev + 1);
        } else {
            toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
        }
    };

    const handlePayment = async (token) => {
        try {
            const response = await fetch('https://your_backend_api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, amount: formData.fees }) // Use formData.fees for amount
            });

            if (response.ok) {
                toast.success('Payment successful!', { position: 'bottom-right' });
                setPaymentProcessed(true);
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            toast.error('Payment failed. Please try again.', { position: 'bottom-right' });
            console.error(error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm(currentPage)) {
            toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
            return;
        }

        if (!paymentProcessed) {
            toast.error('Please complete the payment before submitting the form.', { position: 'bottom-right' });
            return;
        }

        try {
            const response = await fetch('https://oasis-final-directory.onrender.com/consult/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Appointment booked successfully!', { position: 'bottom-right' });
                router.push('/');
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            toast.error('Form submission failed. Please try again.', { position: 'bottom-right' });
            console.error(error);
        }
    };

    const renderFormPart = () => {
        switch (currentPage) {
            case 1:
                return (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="doctorName" className="block text-gray-700">Doctor Name:</label>
                            <input
                                type="text"
                                id="doctorName"
                                name="doctorName"
                                value={formData.doctorName}
                                onChange={handleChange}
                                disabled
                                className={`w-full px-4 py-2 border ${errors.doctorName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.doctorName && <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="preferredDate" className="block text-gray-700">Preferred Date:</label>
                            <input
                                type="date"
                                id="preferredDate"
                                name="preferredDate"
                                value={formData.preferredDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="preferredTime" className="block text-gray-700">Preferred Time:</label>
                            <input
                                type="text"
                                id="preferredTime"
                                name="preferredTime"
                                value={formData.preferredTime}
                                onChange={handleChange}
                                disabled
                                className={`w-full px-4 py-2 border ${errors.preferredTime ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="block text-gray-700">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block text-gray-700">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="consultationReason" className="block text-gray-700">Reason for Consultation:</label>
                            <textarea
                                id="consultationReason"
                                name="consultationReason"
                                value={formData.consultationReason}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.consultationReason ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            ></textarea>
                            {errors.consultationReason && <p className="text-red-500 text-sm mt-1">{errors.consultationReason}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="preferredLanguage" className="block text-gray-700">Preferred Language:</label>
                            <select
                                id="preferredLanguage"
                                name="preferredLanguage"
                                value={formData.preferredLanguage}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            >
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.preferredLanguage && <p className="text-red-500 text-sm mt-1">{errors.preferredLanguage}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="visitedBefore" className="block text-gray-700">Have you visited us before?</label>
                            <select
                                id="visitedBefore"
                                name="visitedBefore"
                                value={formData.visitedBefore}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.visitedBefore ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            {errors.visitedBefore && <p className="text-red-500 text-sm mt-1">{errors.visitedBefore}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="consent" className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    checked={formData.consent}
                                    onChange={handleChange}
                                    className={`mr-2 ${errors.consent ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                                I consent to the terms and conditions
                            </label>
                            {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
                            >
                                Back
                            </button>
                            {paymentProcessed ? (
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handlePaymentButtonClick}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                >
                                    Proceed to Payment
                                </button>
                            )}
                        </div>
                        {showPayment && (
                            <div className="mt-4">
                                <StripeCheckout
                                    stripeKey="your_stripe_public_key_here"
                                    token={handlePayment}
                                    amount={formData.fees * 100} // Convert fees to cents
                                    name="Consultation Fee"
                                    description="Pay for your consultation"
                                    currency="USD"
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-4 inline-block"
                                />
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const handlePaymentButtonClick = () => {
        if (validateForm(currentPage)) {
            setShowPayment(true);
        } else {
            toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
            <form onSubmit={handleFormSubmit}>
                {renderFormPart()}
            </form>
        </div>
    );

}

export default BookingForm;
