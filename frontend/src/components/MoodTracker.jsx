import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

const MoodEmoji = ({ mood, setMood, emojiType, value }) => {
  const EmojiIcon = emojiType;
  return (
    <button
      onClick={() => setMood(value)}
      className={`p-2 rounded-full transition-all ${
        mood === value ? 'bg-teal-200 text-teal-800' : 'text-teal-600 hover:bg-teal-100'
      }`}
    >
      <EmojiIcon size={24} />
    </button>
  );
};

const MoodTracker = ({ mood, setMood }) => (
  <div className="h-full flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-8 text-teal-800">How are you feeling today?</h2>
    <div className="flex space-x-8">
      <MoodEmoji mood={mood} setMood={setMood} emojiType={Smile} value={2} />
      <MoodEmoji mood={mood} setMood={setMood} emojiType={Meh} value={1} />
      <MoodEmoji mood={mood} setMood={setMood} emojiType={Frown} value={0} />
    </div>
    {mood !== null && (
      <p className="mt-8 text-lg text-teal-700">
        Thank you for sharing. Remember, it's okay to feel this way, and help is available if you need it.
      </p>
    )}
  </div>
);

export default MoodTracker;
