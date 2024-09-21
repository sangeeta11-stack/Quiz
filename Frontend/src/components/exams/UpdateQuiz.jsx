import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const UpdateQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [answer, setAnswer] = useState({});
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
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

        const fetchedQuiz = response.data.data.quiz;
        setQuiz(fetchedQuiz);
        setName(fetchedQuiz.name);
        setQuestionList(fetchedQuiz.question_list);
        setAnswer(fetchedQuiz.answer);
        setLoading(false);
      } catch (err) {
        setError('Error fetching quiz: ' + err.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleUpdate = async () => {
    try {
      const updatedQuiz = {
        _id: quizId,
        name,
        question_list: questionList,
        answer,
      };
      
      await axios.put(
        `http://localhost:8080/quiz/update`,
        updatedQuiz,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuccess('Quiz updated successfully!');
      setError(null);
      navigate(`/quiz/${quizId}`); // Redirect to quiz details page
    } catch (err) {
      setError('Error updating quiz: ' + err.message);
      setSuccess(null);
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion || !newOptions || !newAnswer) {
      setError('Please enter a question, options, and the correct option.');
      return;
    }

    const optionsArray = newOptions.split(',').map(option => option.trim());
    const newQuestionObj = {
      question: newQuestion,
      options: optionsArray,
      question_number: questionList.length + 1,
    };

    setQuestionList([...questionList, newQuestionObj]);
    setAnswer({
      ...answer,
      [questionList.length + 1]: newAnswer,
    });
    setNewQuestion('');
    setNewOptions('');
    setNewAnswer('');
    setError(null);
  };

  const handleUpdateQuestion = (index, key, value) => {
    const updatedQuestions = [...questionList];
    updatedQuestions[index][key] = value;
    setQuestionList(updatedQuestions);
  };

  const handleAnswerChange = (questionNumber, value) => {
    setAnswer({
      ...answer,
      [questionNumber]: value,
    });
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const isAuthor = userId && quiz.created_by === userId;
  const canModify = isAuthor && !quiz.is_published;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <div className="flex justify-start">
        <button
          onClick={() => navigate(`/quiz/${quizId}`)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Back to Quiz
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800">Update Quiz</h2>

      {canModify ? (
        <div className="space-y-6">
          {success && <p className="text-green-600 text-center">{success}</p>}

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              Quiz Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </label>

            <h3 className="text-xl font-semibold text-gray-800">Questions:</h3>

            {questionList.map((question, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Question {question.question_number}:
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleUpdateQuestion(index, 'question', e.target.value)}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block text-lg font-medium text-gray-700">
                  Options (comma-separated):
                  <textarea
                    value={question.options.join(', ')}
                    onChange={(e) => handleUpdateQuestion(index, 'options', e.target.value.split(',').map(opt => opt.trim()))}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block text-lg font-medium text-gray-700">
                  Correct Option:
                  <input
                    type="text"
                    value={answer[question.question_number] || ''}
                    onChange={(e) => handleAnswerChange(question.question_number, e.target.value)}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </label>
              </div>
            ))}

            <h3 className="text-xl font-semibold text-gray-800">Add New Question:</h3>

            <label className="block text-lg font-medium text-gray-700">
              Question:
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block text-lg font-medium text-gray-700">
              Options (comma-separated):
              <textarea
                value={newOptions}
                onChange={(e) => setNewOptions(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </label>
            <label className="block text-lg font-medium text-gray-700">
              Correct option:
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </label>
            <button
              onClick={handleAddQuestion}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
            >
              <PlusIcon className="h-6 w-6 mr-2" />
              Add Question
            </button>
          </div>

          <button
            onClick={handleUpdate}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            <CheckCircleIcon className="h-6 w-6 mr-2" />
            Update Quiz
          </button>
        </div>
      ) : (
        <p className="text-red-600 text-center">You are not authorized to update this quiz.</p>
      )}
    </div>
  );
};

export default UpdateQuiz;
