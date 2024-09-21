import React from 'react';
import { FaBrain, FaCode, FaKeyboard, FaLanguage } from 'react-icons/fa';
import './HomePage.css'; // Import the custom CSS for animations

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero bg-cover bg-center text-blue text-center py-20" style={{ background: "yellow" }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-zoom-in-out">Welcome to QuizzEz!</h1>
        <p className="text-lg md:text-2xl mb-8 animate-zoom-in-out">
          Test your knowledge across multiple languages and domains with interactive quizzes.
        </p>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="card animate-zoom-in-out">
            <img src="coding-decoding.jpg" alt="Coding Decoding" className="w-full h-48 object-cover rounded-lg shadow-lg"/>
            <h2 className="text-xl font-semibold mt-4">Decode Your Skills</h2>
            <p>Challenge yourself with coding quizzes designed to sharpen your programming knowledge.</p>
          </div>
          <div className="card animate-zoom-in-out">
            <img src="logos.jpg" alt="Keyboard" className="w-full h-48 object-cover rounded-lg shadow-lg"/>
            <h2 className="text-xl font-semibold mt-4">Master Typing</h2>
            <p>Enhance your typing skills with our interactive keyboard-based quizzes.</p>
          </div>
          <div className="card animate-zoom-in-out">
            <img src="language.jpg" alt="Languages" className="w-full h-48 object-cover rounded-lg shadow-lg"/>
            <h2 className="text-xl font-semibold mt-4">Learn Multiple Languages</h2>
            <p>Test your knowledge in various languages and broaden your global perspective.</p>
          </div>
          <div className="card animate-zoom-in-out">
            <img src="languages name.png" alt="Languages Name" className="w-full h-48 object-cover rounded-lg shadow-lg"/>
            <h2 className="text-xl font-semibold mt-4">Explore Diverse Topics</h2>
            <p>Discover quizzes on a wide range of subjects and expand your horizons.</p>
          </div>
        </div>
     
      <section className="features text-center py-20">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="feature bg-white p-6 rounded-lg shadow-lg w-64 animate-zoom-in-out">
            <FaBrain className="text-blue-500 text-4xl mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Mental Gymnastics</h3>
            <p>Engage in brain-stimulating quizzes that enhance your cognitive abilities.</p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-lg w-64 animate-zoom-in-out">
            <FaCode className="text-green-500 text-4xl mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Code Challenges</h3>
            <p>Improve your programming skills with coding challenges tailored to different levels.</p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-lg w-64 animate-zoom-in-out">
            <FaKeyboard className="text-yellow-500 text-4xl mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Typing Tests</h3>
            <p>Boost your typing speed and accuracy with our engaging typing tests.</p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-lg w-64 animate-zoom-in-out">
            <FaLanguage className="text-purple-500 text-4xl mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Language Learning</h3>
            <p>Expand your knowledge of different languages through our diverse quiz offerings.</p>
          </div>
        </div>
      </section>
      <footer className="text-center py-10 bg-gray-800 text-white">
        <p>&copy; 2024 QuizzEz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
