import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/auth', {
                name: user.name,
                email: user.email,
                password: user.password,
                confirm_password: user.confirmPassword
            });
            if (response.data.status === "success") {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response.data.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
                {error && <p className="text-red-600">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <UserIcon className="h-6 w-6 text-gray-500 ml-3" />
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="flex-1 p-3 border-none outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <EnvelopeIcon className="h-6 w-6 text-gray-500 ml-3" />
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="flex-1 p-3 border-none outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <LockClosedIcon className="h-6 w-6 text-gray-500 ml-3" />
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="flex-1 p-3 border-none outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <LockOpenIcon className="h-6 w-6 text-gray-500 ml-3" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="flex-1 p-3 border-none outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transform transition-transform duration-300 ease-in-out hover:scale-105"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
