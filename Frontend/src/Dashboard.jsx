import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, EyeIcon, CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline'; 


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 space-y-8">
        <h2 className="text-4xl font-bold text-gray-800">Quiz Management Dashboard</h2>
        <p className="text-gray-600 text-lg">Welcome to your quiz dashboard! Manage your quizzes, view reports, and track your progress here.</p>

        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/create-quiz" className="dashboard-link group">
            <div className="p-8 bg-indigo-600 text-white rounded-xl shadow-xl transform transition-transform duration-300 ease-in-out group-hover:scale-105">
              <PencilIcon className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Create Quiz</h3>
              <p>Create and publish your own quizzes with ease.</p>
            </div>
          </Link>

          <Link to="/view-quizzes" className="dashboard-link group">
            <div className="p-8 bg-green-600 text-white rounded-xl shadow-xl transform transition-transform duration-300 ease-in-out group-hover:scale-105">
              <EyeIcon className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">View Quizzes</h3>
              <p>Browse through all the quizzes you have created.</p>
            </div>
          </Link>

          <Link to="/report" className="dashboard-link group">
            <div className="p-8 bg-purple-600 text-white rounded-xl shadow-xl transform transition-transform duration-300 ease-in-out group-hover:scale-105">
              <DocumentTextIcon className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Quiz Reports</h3>
              <p>View performance reports and statistics for attempted quizzes.</p>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
