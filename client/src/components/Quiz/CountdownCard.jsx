import { Card, CardContent } from '@/components/ui/card';
import { Clock, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const CountdownCard = ({ targetDateTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    const targetDate = new Date(targetDateTime);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateTime]);

  const TimeUnit = ({ value, label, index }) => (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovering(index)}
      onMouseLeave={() => setIsHovering(null)}
    >
      <div className="flex flex-col items-center">
        <div className={`
          relative overflow-hidden
          dark:bg-gradient-to-br dark:from-red-500/10 dark:to-rose-500/5
          bg-gradient-to-br from-red-500/20 to-rose-500/10
          rounded-lg p-2 w-14
          transform transition-all duration-300 ease-out
          ${isHovering === index ? 'scale-105 shadow-lg dark:shadow-red-500/20' : 'shadow-sm'}
          border border-red-500/20 dark:border-red-400/10
          backdrop-blur-lg
        `}>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent dark:from-red-400/5 opacity-50" />
          <div className={`
            text-2xl font-bold text-center
            bg-clip-text text-transparent
            bg-gradient-to-b from-red-600 to-rose-600
            dark:from-red-400 dark:to-rose-400
            font-mono tracking-tight
            transition-all duration-300
            ${isHovering === index ? 'scale-105' : ''}
          `}>
            {String(value).padStart(2, '0')}
          </div>
          {isHovering === index && (
            <Sparkles 
              className="absolute top-0.5 right-0.5 w-2 h-2 text-red-500 dark:text-red-400 animate-pulse" 
            />
          )}
        </div>
        <div className="mt-1 text-[10px] font-medium text-red-700 dark:text-red-300 tracking-wide uppercase">{label}</div>
      </div>
    </div>
  );

  const targetDate = new Date(targetDateTime);
  const formattedDate = targetDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="w-full max-w-[280px] relative shadow-none border-none">  
      <CardContent className="relative p-4">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
          <h2 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-rose-700 dark:from-red-400 dark:to-rose-400">
            Start Time
          </h2>
        </div>
        
        <div className="flex justify-center items-center gap-1">
          <TimeUnit value={timeLeft.days} label="d" index={0} />
          <div className="text-xl font-bold text-red-500/50 dark:text-red-400/50 animate-pulse">:</div>
          <TimeUnit value={timeLeft.hours} label="h" index={1} />
          <div className="text-xl font-bold text-red-500/50 dark:text-red-400/50 animate-pulse">:</div>
          <TimeUnit value={timeLeft.minutes} label="m" index={2} />
          <div className="text-xl font-bold text-red-500/50 dark:text-red-400/50 animate-pulse">:</div>
          <TimeUnit value={timeLeft.seconds} label="s" index={3} />
        </div>

        <div className="mt-3 text-center">
          <div className="text-[10px] text-red-600/60 dark:text-red-300/60 font-medium">
            Until {formattedDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownCard;