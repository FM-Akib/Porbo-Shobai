import { AnimatePresence, motion } from 'framer-motion';
import { RiRobot3Line } from 'react-icons/ri';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatAssistant() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPrompt(true);
      setShowPing(true);

      setTimeout(() => {
        setShowPing(false);
      }, 2000);

      setTimeout(() => {
        setShowPrompt(false);
      }, 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleChatClick = () => {
    navigate('/chat');
  };

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3">
      {/* Prompt Box (Appears on the left side) */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="pointer-events-none"
          >
            <div
              className="relative bg-white dark:bg-gray-800 shadow-lg dark:shadow-2xl rounded-lg border border-gray-200 dark:border-gray-700"
              onClick={handleChatClick}
            >
              <div className="p-4">
                <div className="flex flex-col space-y-1.5">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                    Have any doubts?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to start a conversation!
                  </p>
                </div>
                {/* Arrow pointing to the icon */}
                <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 bg-white dark:bg-gray-800 rotate-45 border-r border-b border-gray-200 dark:border-gray-700" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button with Ping Effect */}
      <div className="relative z-50">
        <button
          className="h-16 w-16 rounded-full shadow-lg dark:shadow-2xl p-0 bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 hover:from-gray-800 hover:to-gray-900 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 text-white flex items-center justify-center"
          onClick={handleChatClick}
        >
          <motion.div
            animate={showPing ? { scale: [1, 0.9, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <RiRobot3Line className="h-8 w-8" />
            </div>
          </motion.div>
        </button>

        {/* Ping Animation */}
        <AnimatePresence>
          {showPing && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 1, repeat: 2 }}
              className="absolute inset-0 rounded-full bg-gray-500/20 dark:bg-gray-300/20 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Online Indicator */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-gray-900" />
      </div>
    </div>
  );
}
