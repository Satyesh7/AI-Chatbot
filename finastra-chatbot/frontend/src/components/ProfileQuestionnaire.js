// frontend/src/components/ProfileQuestionnaire.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileQuestionnaire = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        monthlyIncome: '',
        monthlySavings: '',
        monthlyInvestment: '',
        investmentGoals: [],
        riskTolerance: '',
        timeHorizon: ''
    });

    const goals = [
        'Retirement',
        'Wealth Growth',
        'Education',
        'Home Purchase',
        'Emergency Fund'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate required fields
            if (!formData.monthlyIncome || !formData.riskTolerance || !formData.timeHorizon) {
                alert('Please fill in all required fields');
                return;
            }
    
            // Create complete profile data
            const profileData = {
                ...formData,
                userId: 'user-' + Date.now(),
                monthlyIncome: Number(formData.monthlyIncome),
                monthlySavings: Number(formData.monthlySavings || 0),
                monthlyInvestment: Number(formData.monthlyInvestment || 0),
                investments: [] // Initialize empty investments array
            };
    
            console.log('Submitting profile data:', profileData);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/profile`, profileData);
            
            console.log('Profile creation response:', response.data);
            
            if (response.data) {
                localStorage.setItem('userId', response.data.userId);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error creating profile:', error.response?.data || error);
            alert('Error creating profile. Please try again.');
        }
    };

    const handleGoalChange = (goal) => {
        setFormData(prev => ({
            ...prev,
            investmentGoals: prev.investmentGoals.includes(goal)
                ? prev.investmentGoals.filter(g => g !== goal)
                : [...prev.investmentGoals, goal]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Investment Profile
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Income (₹)
                        </label>
                        <input
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                            className="input-field"
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Savings (₹)
                        </label>
                        <input
                            type="number"
                            value={formData.monthlySavings}
                            onChange={(e) => setFormData({...formData, monthlySavings: e.target.value})}
                            className="input-field"
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Investment (₹)
                        </label>
                        <input
                            type="number"
                            value={formData.monthlyInvestment}
                            onChange={(e) => setFormData({...formData, monthlyInvestment: e.target.value})}
                            className="input-field"
                            required
                            min="0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Investment Goals
                        </label>
                        <div className="space-y-2">
                            {goals.map(goal => (
                                <label key={goal} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.investmentGoals.includes(goal)}
                                        onChange={() => handleGoalChange(goal)}
                                        className="checkbox-field"
                                    />
                                    <span className="text-sm text-gray-700">{goal}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Risk Tolerance
                        </label>
                        <select
                            value={formData.riskTolerance}
                            onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
                            className="input-field"
                            required
                        >
                            <option value="">Select Risk Tolerance</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Horizon
                        </label>
                        <select
                            value={formData.timeHorizon}
                            onChange={(e) => setFormData({...formData, timeHorizon: e.target.value})}
                            className="input-field"
                            required
                        >
                            <option value="">Select Time Horizon</option>
                            <option value="short">Short Term (0-2 years)</option>
                            <option value="medium">Medium Term (2-5 years)</option>
                            <option value="long">Long Term (5+ years)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary"
                    >
                        Submit Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileQuestionnaire;