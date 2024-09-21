import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attemptedQuestions, setAttemptedQuestions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
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

        const response = await axios.get(`http://localhost:8080/exam/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedQuiz = response.data.data.quiz;
        setQuiz(fetchedQuiz);
        setLoading(false);
      } catch (err) {
        setError('Error fetching quiz: ' + err.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionNumber, value) => {
    setAttemptedQuestions({
      ...attemptedQuestions,
      [questionNumber]: Number(value), // Ensure the answer is a number
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const convertedAttemptedQuestions = {};
      for (let key in attemptedQuestions) {
        convertedAttemptedQuestions[key] = Number(attemptedQuestions[key]);
      }

      const response = await axios.post(
        `http://localhost:8080/exam/`,
        {
          quizId,
          attempted_questions: convertedAttemptedQuestions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { total, score } = response.data.data;
      setTotal(total);
      setScore(score);
      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError('Error submitting quiz: ' + err.message);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto text-center transition-transform transform hover:scale-105 duration-300">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Submitted</h2>
            <p className="text-xl mb-6">
              Your Score: <span className="font-bold text-blue-600">{score} / {total}</span>
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
            >
              <FaArrowLeft className="mr-2" />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      );
    };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{quiz.name}</h2>
      <form className="space-y-6">
        {quiz.question_list.map((question, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md transform transition duration-300 hover:scale-105"
          >
            <p className="text-lg font-semibold mb-4">
              <strong>Question {index + 1}: </strong>
              {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option, i) => {
                const value = i + 1;
                return (
                  <div key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question_${index + 1}`}
                      value={value}
                      checked={Number(attemptedQuestions[index + 1]) === value}
                      onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label className="text-gray-700">{option}</label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <FaCheck className="mr-2" /> Submit Quiz
          </button>
          <button
          onClick={() => navigate(`/quiz/${quizId}`)}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          Cancel
        </button>
          
        </div>
      </form>
    </div>
  );
};


export default AttemptQuiz;
