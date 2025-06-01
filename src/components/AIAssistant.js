import { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hello! I\'m your fashion assistant for M3 Outfit. How can I help you find the perfect look today?' }
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage(''); // Clear input immediately

    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    
    // Call the serverless function
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { type: 'bot', message: data.response }]);
    } catch (error) {
      console.error('Error calling Fashion Assistant API:', error);
      setChatHistory(prev => [...prev, { type: 'bot', message: 'Sorry, I couldn\'t get a response right now. Please try again later.' }]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-secondary transition-all duration-300 z-50 flex items-center justify-center group"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
        <span className="absolute right-16 bg-white text-primary px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Fashion Assistant
        </span>
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <h3 className="font-semibold">Fashion Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    chat.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant; 