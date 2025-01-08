// frontend/src/components/ChatBot.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const userId = localStorage.getItem('userId');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        try {
            setIsLoading(true);
            // Add user message to chat
            const userMessage = { text: input, sender: 'user', type: 'TEXT' };
            setMessages(prev => [...prev, userMessage]);
            setInput('');

            console.log('Sending message with userId:', userId);
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, {
                message: input,
                userId: userId
            });

            console.log('Chat response:', response.data);

            const botResponse = {
                text: response.data.message,
                sender: 'bot',
                type: response.data.type,
                data: response.data.data
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error.response || error);
            setMessages(prev => [...prev, {
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                type: 'ERROR'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = (msg) => {
        switch (msg.type) {
            case 'STOCK_PRICE':
                return (
                    <div className="flex flex-col">
                        <span>{msg.text}</span>
                        {msg.data && msg.data.price && (
                            <div className="mt-2 p-2 bg-gray-100 rounded">
                                <p>Price: ${msg.data.price['05. price']}</p>
                                <p>Change: {msg.data.price['09. change']}%</p>
                                <p>Volume: {msg.data.price['06. volume']}</p>
                            </div>
                        )}
                    </div>
                );

            case 'INVESTMENT_RECOMMENDATION':
                return (
                    <div className="flex flex-col">
                        <span className="whitespace-pre-line">{msg.text}</span>
                        {msg.data && msg.data.overview && (
                            <div className="mt-2 p-2 bg-gray-100 rounded">
                                <h4 className="font-bold">Company Overview</h4>
                                <p>{msg.data.overview.Description}</p>
                            </div>
                        )}
                    </div>
                );

            default:
                return <span className="whitespace-pre-line">{msg.text}</span>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Finastra AI Assistant</h2>
                </div>

                <div className="h-[600px] overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                        >
                            <div
                                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                                    msg.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {renderMessage(msg)}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="text-center">
                            <div className="inline-block animate-spin">⌛</div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Ask about stocks, investments, or get recommendations..."
                            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isLoading}
                            className={`px-6 py-2 rounded-r ${
                                isLoading
                                    ? 'bg-gray-400'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white transition-colors`}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;