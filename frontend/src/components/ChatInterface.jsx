import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(!isUser);

  useEffect(() => {
    if (!isUser) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        let i = 0;
        const typingInterval = setInterval(() => {
          setDisplayText(message.slice(0, i));
          i++;
          if (i > message.length) {
            clearInterval(typingInterval);
          }
        }, 30);
        return () => clearInterval(typingInterval);
      }, 1500); // Adjust this delay as needed
    } else {
      setDisplayText(message);
    }
  }, [message, isUser]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          isUser ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {isTyping ? (
          <span className="typing-indicator">•••</span>
        ) : (
          displayText
        )}
      </div>
    </div>
  );
};

const ChatInterface = ({ chatMessages, setChatMessages, inputMessage, setInputMessage }) => {
    const chatContainerRef = useRef(null);

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [chatMessages]);
  
    const handleSendMessage = async () => {
      if (inputMessage.trim()) {
        const newMessage = { text: inputMessage, isUser: true };
        setChatMessages((prev) => [...prev, newMessage]);
        setInputMessage('');
  
        try {
          const response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputMessage }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          const botMessage = { text: data.response, isUser: false };
          setChatMessages((prev) => [...prev, botMessage]);
        } catch (error) {
          console.error('Error:', error);
          const errorMessage = { text: "Sorry, I couldn't process your request. Please try again.", isUser: false };
          setChatMessages((prev) => [...prev, errorMessage]);
        }
      }
    };

  return (
    <div className="h-full flex flex-col">
      <div ref={chatContainerRef} className="flex-1 overflow-auto mb-4 px-4">
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="flex items-center px-4 pb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-500 text-white p-2 rounded-r-lg hover:bg-teal-600 transition-colors"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;