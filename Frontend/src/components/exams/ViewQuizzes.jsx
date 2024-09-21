import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DocumentTextIcon, PlusCircleIcon } from '@heroicons/react/24/outline';


const ViewQuizzes = () => {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:8080'; // Backend URL

        const fetchAllQuizzes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/view_quizzes/`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setAllQuizzes(response.data?.data?.quiz || []);
            } catch (error) {
                setError('Error fetching all quizzes.');
                console.error('Error fetching all quizzes:', error.response?.data || error.message);
            }
        };

        fetchAllQuizzes();
        setLoading(false);
    }, []); 

    if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <DocumentTextIcon className="h-8 w-8 text-indigo-600 mr-2" />
                        <h2 className="text-3xl font-bold text-gray-800">View Quizzes</h2>
                    </div>
                    <Link to="/create-quiz" className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105">
                        <PlusCircleIcon className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Create Quiz</span>
                    </Link>
                </div>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">All Quizzes</h3>
                <ul className="space-y-4">
                    {Array.isArray(allQuizzes) && allQuizzes.length > 0 ? (
                        allQuizzes.map((quiz) => (
                            <li key={quiz._id} className="bg-gray-50 p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                                <Link to={`/quiz/${quiz._id}`} className="flex items-center text-indigo-600 hover:text-indigo-800">
                                    <DocumentTextIcon className="h-5 w-5 mr-3" />
                                    <span className="text-lg font-medium">{quiz.name}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600">No quizzes available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ViewQuizzes;
