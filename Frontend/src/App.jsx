import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./input.css"

import Navbar from './components/navbar';
import Dashboard from './Dashboard';
import Signup from './components/users/Registration';
import Login from './components/users/Login';
import CreateQuiz from './components/exams/CreateQuiz';
import ViewQuiz from './components/exams/ViewQuiz';
import UpdateQuiz from './components/exams/UpdateQuiz';
import DeleteQuiz from './components/exams/DeleteQuiz';
import PublishQuiz from './components/exams/PublishQuiz';
import ViewQuizzes from './components/exams/ViewQuizzes';
import AttemptedQuizzes from './components/exams/AttemptedQuizzes';
import ResultAll from './components/exams/ResultAll';
import Report from './components/exams/Report';
import Contact from './components/users/Contact';
import Home from './components/users/Home';



const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home?" element={<Home/>} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/login" : "/login"} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/create-quiz" element={isAuthenticated ? <CreateQuiz /> : <Navigate to="/login" />} />
        <Route path="/view-quizzes" element={isAuthenticated ? <ViewQuizzes /> : <Navigate to="/login" />} />
        <Route path="/exam/:quizId" element={isAuthenticated ? <AttemptedQuizzes /> : <Navigate to="/login" />} />
        <Route path="/quiz/:quizId" element={isAuthenticated ? <ViewQuiz /> : <Navigate to="/login" />} />
        <Route path="/quiz/:quizId/update" element={isAuthenticated ? <UpdateQuiz /> : <Navigate to="/login" />} />
        <Route path="/quiz/:quizId/delete" element={isAuthenticated ? <DeleteQuiz /> : <Navigate to="/login" />} />
        <Route path="/quiz/:quizId/publish" element={isAuthenticated ? <PublishQuiz /> : <Navigate to="/login" />} /> 
        <Route path="/report/:resultId" element={isAuthenticated ? <Report/> : <Navigate to="/login" />} />
        <Route path="/report" element={isAuthenticated ? <ResultAll/> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
};

export default App;
