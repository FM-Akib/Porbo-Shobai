import { useEffect, useState } from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ChatAssistant() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    // Show prompt every 10 seconds (10000ms)
    const interval = setInterval(() => {
      setShowPrompt(true);
      setShowPing(true);

      // Hide ping after 2 seconds
      setTimeout(() => {
        setShowPing(false);
      }, 2000);

      // Hide prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(false);
      }, 3000);
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleChatClick = () => {
    router('/chat');
  };

  return (
    <div className="fixed bottom-5 right-5 flex gap-1 flex-row-reverse items-center space-x-3">
      {/* Chat Icon */}
      <div className="relative">
        <div
          className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
          onClick={handleChatClick}
        >
          <FaUserGraduate size={24} />
        </div>

        {/* Ping animation */}
        {showPing && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
        )}
      </div>

      {/* Prompt Box (Visible every 10 sec) */}
      {showPrompt && (
        <div
          className="bg-white text-black p-3 rounded-lg shadow-md border border-gray-300 animate-fadeIn ml-3"
          onClick={handleChatClick}
        >
          Have you any doubt?
        </div>
      )}
    </div>
  );
}
