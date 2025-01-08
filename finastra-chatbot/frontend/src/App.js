// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProfileQuestionnaire from './components/ProfileQuestionnaire';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import './styles.css'; // Make sure this file exists with Tailwind imports

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-lg">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex justify-between">
                            <div className="flex space-x-7">
                                <Link to="/" className="py-4 px-2 text-gray-700 hover:text-blue-500 transition-colors">Home</Link>
                                <Link to="/profile" className="py-4 px-2 text-gray-700 hover:text-blue-500 transition-colors">Profile</Link>
                                <Link to="/dashboard" className="py-4 px-2 text-gray-700 hover:text-blue-500 transition-colors">Dashboard</Link>
                                <Link to="/chat" className="py-4 px-2 text-gray-700 hover:text-blue-500 transition-colors">Chat</Link>
                            </div>
                        </div>
                    </div>
                </nav>
                
                <div className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<ProfileQuestionnaire />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/chat" element={<ChatBot />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const Home = () => {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Finastra AI Chatbot
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Your personal AI-powered financial assistant
                </p>
                <Link 
                    to="/profile" 
                    className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg 
                             text-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default App;