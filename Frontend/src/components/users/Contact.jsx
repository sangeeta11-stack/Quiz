import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const randomNumber = () => Math.floor(Math.random() * 1000);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full animate-zoom-in">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaPhone className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-600">+1 (123) 456-{randomNumber()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="text-gray-600">contact@example.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-red-500 text-3xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Address</h2>
              <p className="text-gray-600">123 Main St, Hometown, USA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
