import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaTimesCircle } from 'react-icons/fa';


const DeleteQuiz = () => {
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
        setError('Error fetching quiz: ' + err.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/quiz/${quizId}/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/view-quizzes'); 
    } catch (err) {
      setError('Error deleting quiz: ' + err.message);
    }
  };

  if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg font-semibold">Error: {error}</p>;
  if (!quiz) return <p className="text-center text-lg">No quiz found.</p>;

  const isAuthor = userId && quiz.created_by === userId;
  const canModify = isAuthor && !quiz.is_published;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-center mb-4">Delete Quiz</h2>
      {canModify ? (
        <div>
          <p className="text-lg text-gray-800 mb-6 text-center">
            Are you sure you want to delete the quiz: <strong>{quiz.name}</strong>?
          </p>
          <ul className="space-y-4">
            {quiz.question_list.map((question, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <strong className="block mb-2">Question {question.question_number}:</strong>
                <p>{question.question}</p>
                <ul className="list-disc pl-5 mt-2">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="text-gray-700">{option}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={handleDelete}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200"
            >
              <FaTrashAlt className="mr-2" />
              Confirm Delete
            </button>
            <button
              onClick={() => navigate(`/quiz/${quizId}`)}
              className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200"
            >
              <FaTimesCircle className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 text-lg">
          You are not authorized to delete this quiz or it is already published.
        </p>
      )}
    </div>
  );
};
export default DeleteQuiz;
