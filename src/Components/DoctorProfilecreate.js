
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {jwtDecode} from 'jwt-decode';
import '../css/oasis.css';
import ECGGraph from './Ecg'; 
import Image from 'next/image';

function ProfilePage({ setUserName }) {
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        email: '',
        bio: '',
        registeredId: '',
        workingHospitals: '',
        age: '',
        contactNo: '',
        availability: [{ day: '', time: '' }],
        fees: '',
        accountNo: ''
    });
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        // Decode JWT token and extract full name and email
        const token = localStorage.getItem('auth-token'); // Adjust based on where you store your token
        if (token) {
            const decodedToken = jwtDecode(token);
            setFormData(prev => ({
                ...prev,
                fullName: decodedToken.userName || '',
                email: decodedToken.email || ''
            }));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.position) newErrors.position = 'Your position is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.registeredId) newErrors.registeredId = 'Registered ID is required';
        if (!formData.workingHospitals) newErrors.workingHospitals = 'Working hospitals are required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.contactNo || formData.contactNo.length !== 10) newErrors.contactNo = 'Valid 10-digit phone number required';
        if (!formData.fees) newErrors.fees = 'Fees are required';
        if (!formData.accountNo) newErrors.accountNo = 'Account number is required';
        formData.availability.forEach((slot, index) => {
            if (!slot.day) newErrors[`day${index}`] = 'Day is required';
            if (!slot.time) newErrors[`time${index}`] = 'Time is required';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvailabilityChange = (index, field, value) => {
        const newAvailability = formData.availability.map((slot, idx) =>
            index === idx ? { ...slot, [field]: value } : slot
        );
        setFormData(prev => ({ ...prev, availability: newAvailability }));
    };

    const handleAddAvailability = () => {
        setFormData(prev => ({
            ...prev, availability: [...prev.availability, { day: '', time: '' }]
        }));
    };

    const handleRemoveAvailability = (index) => {
        setFormData(prev => ({
            ...prev, availability: prev.availability.filter((_, idx) => idx !== index)
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) setProfileImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const data = new FormData();
        data.append('profileImage', profileImage);
        data.append('fullName', formData.fullName);
        data.append('position', formData.position);
        data.append('email', formData.email);
        data.append('bio', formData.bio);
        data.append('registeredId', formData.registeredId);
        data.append('workingHospitals', formData.workingHospitals);
        data.append('age', formData.age);
        data.append('contactNo', formData.contactNo);
        data.append('availability', JSON.stringify(formData.availability));
        data.append('fees', formData.fees);
        data.append('accountNo', formData.accountNo);

        try {
            const response = await fetch('https://oasis-final-directory.onrender.com/Doctors/create', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                toast.success("Profile saved successfully", { position: "bottom-right" });
                router.push('/Doctors/home');
            } else {
                throw new Error('Failed to save profile');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to save profile", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    const renderFormInput = (key, label, type = 'text', disabled = false) => (
        <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                id={key}
                name={key}
                type={type}
                value={formData[key]}
                onChange={handleChange}
                disabled={disabled}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors[key] && <div className="text-red-600 text-sm">{errors[key]}</div>}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FFFCFC] to-[#AB9551] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="pace-y-8 bg-white p-8 rounded-lg shadow-md" style={{ width: '800px' }}>
                <h1 className="text-center text-3xl font-extrabold text-gray-900">Your Profile</h1>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" encType="multipart/form-data">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                            <input
                                id="profileImage"
                                name="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {profileImage && <Image src={URL.createObjectURL(profileImage)} alt="Profile" className="w-32 h-32 rounded-full mt-4" />}
                        </div>
                        {renderFormInput('fullName', 'Full Name', 'text', true)}
                        {renderFormInput('email', 'Email', 'email', true)}
                        {Object.keys(formData).filter(key => key !== 'availability' && key !== 'fullName' && key !== 'email').map(key => (
                            renderFormInput(key, key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(), key === 'age' || key === 'contactNo' ? 'number' : 'text')
                        ))}
                        {formData.availability.map((slot, index) => (
                            <div key={index} className="flex space-x-2 items-center mb-4">
                                <input
                                    type="text"
                                    placeholder="Day"
                                    value={slot.day}
                                    onChange={(e) => handleAvailabilityChange(index, 'day', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <input
                                    type="time"
                                    placeholder="Time"
                                    value={slot.time}
                                    onChange={(e) => handleAvailabilityChange(index, 'time', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                <button type="button" onClick={() => handleRemoveAvailability(index)} className="text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddAvailability} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0e0737] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Availability
                        </button>
                    </div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e0737]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={loading}>
                        {loading ? <div className="flex items-center justify-centerfy-center"><ECGGraph /></div> : 'Save Profile'}

                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
