import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, PlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionList = questions.map((q, index) => ({
      question_number: index + 1,
      question: q.question,
      options: q.options,
    }));

    const answerMap = {};
    questions.forEach((q, index) => {
      answerMap[index + 1] = q.answer;
    });

    try {
      const response = await fetch('http://localhost:8080/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: quizName,
          question_list: questionList,
          answer: answerMap,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Quiz created successfully');
        navigate('/dashboard'); // Redirect to dashboard or quiz list
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <PencilIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Create Quiz</h2>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quiz Name:</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {questions.map((q, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm transition-transform transform hover:scale-105">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mr-2">Question {index + 1}</h3>
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
              <input
                type="text"
                placeholder="Enter question"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                required
                className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div className="mb-4">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Option {oIndex + 1}:</label>
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Correct Option:</label>
                <input
                  type="text"
                  placeholder="Enter the correct option"
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center text-indigo-600 hover:text-indigo-700 focus:outline-none mb-4"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Question
          </button>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};


export default CreateQuiz;
