import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { text: message, sender: 'user' };
    setMessages([...messages, userMsg]);
    setMessage('');
    setIsTyping(true);

    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const botMsg = { text: data.reply, sender: 'bot' };

    setMessages([...messages, userMsg, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-xl border bg-white">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Porbo Shobai Master 🤖
          </h1>
          <div className="h-96 overflow-y-auto p-4 bg-gray-50 rounded-md shadow-inner space-y-4 flex flex-col">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-xl max-w-xs text-sm shadow-md font-medium ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-300 text-gray-900 self-start'
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {isTyping && (
              <div className="p-4 rounded-xl max-w-xs bg-gray-300 text-gray-800 self-start flex items-center space-x-2">
                <Loader2 className="animate-spin" size={18} />
                <span>Typing...</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') sendMessage();
              }}
              className="flex-1 p-3 border rounded-lg outline-none focus:ring focus:ring-emerald-300"
              placeholder="Type a message..."
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-lg hover:opacity-90 flex items-center gap-2"
            >
              <Send size={18} /> Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
