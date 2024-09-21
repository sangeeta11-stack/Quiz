import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



const PublishQuiz = () => {
  const { quizId } = useParams(); // Get the quizId from the route params
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  const [success, setSuccess] = useState(null); // For success message
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
        setUserId(storedUserId);

        const response = await axios.get(`http://localhost:8080/quiz/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const handlePublish = async () => {
  if (quiz.is_published) {
      setError('This quiz has already been published.');
      setSuccess(null); 
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8080/quiz/publish`,
        { quizId }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuccess('Quiz successfully published!');  
      setError(null); 
      setQuiz((prevQuiz) => ({ ...prevQuiz, is_published: true })); 
    } catch (err) {
      setError('There was an error publishing the quiz.');
      setSuccess(null); 
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>No quiz found.</p>;

  const isAuthor = userId && quiz.created_by === userId;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Publish Quiz</h2>
      <p className="text-center text-lg text-gray-600 mb-4">
        Are you sure you want to publish the quiz: <strong>{quiz.name}</strong>?
      </p>

      {isAuthor ? (
        <div className="text-center">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          
          {!quiz.is_published && (
            <button
              onClick={handlePublish}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md mb-4"
            >
              Publish Quiz
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-red-500">You are not the author of this quiz.</p>
      )}

      <div className="text-center">
        <button
          onClick={() => navigate(`/quiz/${quizId}`)}
          className="mt-6 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-transform transform hover:scale-105 shadow-md"
        >
          Back to Quiz
        </button>
      </div>
    </div>
  );
};

export default PublishQuiz;
