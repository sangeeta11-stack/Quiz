import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaRegFileAlt, FaArrowRight } from 'react-icons/fa'; // Importing icons


const Report = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { resultId } = useParams(); // Get resultId from URL params

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8080/report/${resultId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReport(response.data.data.report);
        setLoading(false);
      } catch (err) {
        setError('Error fetching report: ' + err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchReport();
  }, [resultId]);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 border-b-4 border-blue-500 inline-block pb-2">
        <FaRegFileAlt className="inline-block mr-2 text-blue-500 animate-pulse" /> Report Details
      </h2>

      {report ? (
        <div className="report-item bg-blue-100 p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <p className="text-lg mb-4">
            <strong className="font-semibold">Quiz ID:</strong> {report.quizId}
          </p>
          <p className="text-lg mb-4">
            <strong className="font-semibold">Score:</strong> {report.score}
          </p>
          <p className="text-lg mb-4">
            <strong className="font-semibold">Total Questions:</strong> {report.total}
          </p>
          <p className="text-lg mb-4">
            <strong className="font-semibold">Date:</strong> {new Date(report.createdAt).toLocaleDateString()}
          </p>

          <Link
            to={`/quiz/${report.quizId}`}
            className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transform transition duration-300 hover:scale-110"
          >
            View Quiz <FaArrowRight className="ml-2" />
          </Link>
        </div>
      ) : (
        <p className="text-center text-lg">No report found.</p>
      )}
    </div>
  );
};

export default Report;
