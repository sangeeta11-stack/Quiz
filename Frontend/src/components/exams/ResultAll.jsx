import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaArrowLeft } from 'react-icons/fa';

const ResultAll = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Get userId from localStorage

        if (!token) {
          setError('User is not authenticated.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8080/report', {
          headers: { Authorization: `Bearer ${token}`},
        });

        const fetchedReports = response.data?.data?.report || [];
        const filteredReports = fetchedReports.filter(report => report.userId === userId);
        setReports(filteredReports);
        setLoading(false);
      } catch (err) {
        setError('Error fetching reports: ' + err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 border-b-4 border-blue-500 inline-block pb-2">
        <FaClipboardList className="inline-block mr-2 text-blue-500 animate-bounce" /> Your Reports
      </h2>

      <ul className="space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <li key={report._id} className="bg-blue-100 p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:bg-blue-200">
              <Link
                to={`/report/${report._id}`}
                className="block text-lg font-medium text-blue-600 hover:text-blue-800 transform transition duration-300 hover:scale-110"
              >
                <span className="font-bold">Quiz Id:</span> {report.quizId || 'N/A'} | <span className="font-bold">Score:</span> {report.score}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No reports found.</p>
        )}
      </ul>

      <button
        onClick={() => navigate('/dashboard')}
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
      >
        <FaArrowLeft className="mr-2" />
        <span>Go to Dashboard</span>
      </button>
    </div>
  );
};

export default ResultAll;
