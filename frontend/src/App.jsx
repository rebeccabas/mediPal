// src/App.jsx
import React, { useState, useEffect } from 'react';
import { MessageCircle, BarChart2, Settings } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import MoodVisualization from './components/MoodVisualization';

const db = {
  saveMood: (mood) => {
    const moodData = JSON.parse(localStorage.getItem('moodData')) || [];
    moodData.push({ date: new Date().toISOString(), mood });
    localStorage.setItem('moodData', JSON.stringify(moodData));
  },
  getMoods: () => {
    return JSON.parse(localStorage.getItem('moodData')) || [];
  },
  saveMessage: (message) => {
    const chatMessages = JSON.parse(localStorage.getIStem('chatMessages')) || [];
    chatMessages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  },
  getMessages: () => {
    return JSON.parse(localStorage.getItem('chatMessages')) || [];
  },
};

const MentalHealthChatbot = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [mood, setMood] = useState(null);
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    setChatMessages(db.getMessages());
    const moods = db.getMoods();
    const processedData = moods.map(m => ({
      date: new Date(m.date).toLocaleDateString(),
      mood: m.mood
    }));
    setMoodData(processedData);
  }, []);

  useEffect(() => {
    if (mood !== null) {
      db.saveMood(mood);
      const updatedMoods = db.getMoods();
      const processedData = updatedMoods.map(m => ({
        date: new Date(m.date).toLocaleDateString(),
        mood: m.mood
      }));
      setMoodData(processedData);
    }
  }, [mood]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-16 bg-teal-800 flex flex-col items-center py-8">
        <button
          onClick={() => setActiveTab('chat')}
          className={`p-3 mb-4 rounded-full ${
            activeTab === 'chat' ? 'bg-teal-200 text-teal-800' : 'text-teal-200 hover:bg-teal-700'
          }`}
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={() => setActiveTab('mood')}
          className={`p-3 mb-4 rounded-full ${
            activeTab === 'mood' ? 'bg-teal-200 text-teal-800' : 'text-teal-200 hover:bg-teal-700'
          }`}
        >
          <BarChart2 size={24} />
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`p-3 rounded-full ${
            activeTab === 'settings' ? 'bg-teal-200 text-teal-800' : 'text-teal-200 hovereal-700'
          }`}
        >
          <Settings size={24} />
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-teal-600 text-white p-4">
          <h1 className="text-2xl font-bold">mediPal</h1>
        </header>
        <main className="flex-1 overflow-hidden">
          {activeTab === 'chat' && (
            <ChatInterface
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
            />
          )}
          {activeTab === 'mood' && (
            <div className="h-full flex flex-col">
              <MoodTracker mood={mood} setMood={setMood} />
              <MoodVisualization moodData={moodData} />
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="h-full flex flex-col items-center justify-center p-4">
              <h2 className="text-2xl font-bold mb-8 text-teal-800">Settings</h2>
              <p className="text-lg text-teal-700">Settings options will be available here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MentalHealthChatbot;
