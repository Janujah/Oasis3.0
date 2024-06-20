"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import image from '../image/shutterstock_1753066349.webp'

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "3a5acfc4-8c08-43ee-8ac7-0e2c015c58b9");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#FFFCFC] to-[#AB9551]" >
            <form onSubmit={onSubmit} className="p-10 bg-white shadow-md rounded-lg w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start" >
                <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0 md:mr-8">
                    <Image src={image} className="w-full h-96 object-cover rounded" alt="Contact Us" />
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                    <div className="w-full max-w-lg">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded h-24"
                            />
                        </div>
                        <button type="submit" className="w-full p-2 bg-[#0e0737] text-white rounded hover:bg-[#0a052a]" id='button'>Send</button>
                    </div>
                    <span className="mt-4 text-green-500">{result}</span>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
