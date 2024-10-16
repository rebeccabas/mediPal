import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodVisualization = ({ moodData }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8 text-teal-800">Your Mood Over Time</h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 2]} ticks={[0, 1, 2]} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#0d9488" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodVisualization;
