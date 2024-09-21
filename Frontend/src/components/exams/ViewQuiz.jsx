import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PencilIcon, DocumentTextIcon, PlayCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ViewQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('User is not authenticated.');
                    setLoading(false);
                    return;
                }

                // Retrieve userId from localStorage
                const storedUserId = localStorage.getItem('userId');
                if (!storedUserId) {
                    setError('User ID not found.');
                    setLoading(false);
                    return;
                }
                setUserId(storedUserId);

                const response = await axios.get(`http://localhost:8080/quiz/${quizId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setQuiz(response.data.data.quiz);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

     if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (!quiz) return <p className="text-center text-gray-500">No quiz found.</p>;

    const isAuthor = userId && quiz.created_by === userId;
    const canModify = isAuthor && !quiz.is_published;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            {/* Back to All Quizzes Button */}
            <div className="flex justify-start">
                <button
                    onClick={() => navigate('/view-quizzes')}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition"
                >
                    <ArrowLeftIcon className="h-6 w-6 mr-2" />
                    Back to All Quizzes
                </button>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">{quiz.name}</h2>
            
            <ul className="space-y-4">
                {quiz.question_list.map((question, index) => (
                    <li key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-lg font-semibold mb-2">
                            <strong>Question {question.question_number}:</strong> {question.question}
                        </div>
                        <ul className="list-disc pl-5">
                            {question.options.map((option, optionIndex) => (
                                <li key={optionIndex} className="text-gray-700">{option}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            {isAuthor && (
                <div className="space-y-4">
                    {canModify && (
                        <div className="flex space-x-4">
                            <Link to={`/quiz/${quizId}/update`} className="flex items-center text-blue-600 hover:text-blue-800 transition">
                                <PencilIcon className="h-6 w-6 mr-2" />
                                Update Quiz
                            </Link>
                            <Link to={`/quiz/${quizId}/delete`} className="flex items-center text-blue-600 hover:text-blue-800 transition">
                                <PencilIcon className="h-6 w-6 mr-2" />
                                Delete Quiz
                            </Link>                            
                        </div>
                    )}
                    {!quiz.is_published && (
                        <Link to={`/quiz/${quizId}/publish`} className="flex items-center text-green-600 hover:text-green-800 transition">
                            <DocumentTextIcon className="h-6 w-6 mr-2" />
                            Publish Quiz
                        </Link>
                    )}
                </div>
            )}

            {quiz.is_published && (
                <Link to={`/exam/${quizId}/`} className="flex items-center text-indigo-600 hover:text-indigo-800 transition">
                    <PlayCircleIcon className="h-6 w-6 mr-2" />
                    Attempt Quiz
                </Link>
            )}
        </div>
    );
};

export default ViewQuiz;
