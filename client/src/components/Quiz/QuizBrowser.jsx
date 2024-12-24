import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';

export default function QuizBrowser() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(storedQuizzes);

    // Initialize countdown timers
    const initialTimers = {};
    storedQuizzes.forEach((quiz) => {
      const timeRemaining = new Date(quiz.startDate).getTime() - new Date().getTime();
      initialTimers[quiz.id] = timeRemaining > 0 ? timeRemaining : 0;
    });
    setTimers(initialTimers);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = {};
        for (const id in prevTimers) {
          updatedTimers[id] = Math.max(prevTimers[id] - 1000, 0);
        }
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`;
  };

  const handleStartQuiz = async () => {
    try {
      // Request clipboard permission
      await navigator.permissions.query({ name: 'clipboard-read' });

      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream immediately

      // Navigate to quiz
      window.location.href = `/quiz/${selectedQuiz.id}`;
    } catch {
      alert('Camera and clipboard permissions are required to take the quiz');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const quizStartTime = new Date(quiz.startDate).getTime();
          const quizEndTime = quizStartTime + quiz.duration * 60 * 1000; // Duration in milliseconds
          const currentTime = new Date().getTime();
          const isQuizExpired = currentTime > quizEndTime;

          return (
            <Card key={quiz.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Duration: {quiz.duration} minutes</p>
                  <p>Questions: {quiz.questions.length}</p>
                  {timers[quiz.id] > 0 ? (
                    <p className="text-sm text-red-500">
                      Starts in: {formatTime(timers[quiz.id])}
                    </p>
                  ) : isQuizExpired ? (
                    <p className="text-sm text-gray-500 font-semibold">Expired</p>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setShowRules(true);
                      }}
                    >
                      Take Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quiz Rules</DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-6">
              <span className="text-sm text-muted-foreground">
                Please read the following rules carefully:
              </span>

              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>The quiz has a time limit of {selectedQuiz?.duration} minutes</li>
                <li>You cannot leave the quiz page once started</li>
                <li>Copying text is not allowed and will be tracked</li>
                <li>Your camera will be active during the quiz</li>
                <li>Random screenshots will be taken for monitoring</li>
                <li>You cannot return to previous questions</li>
                <li>The quiz will auto-submit when the time is up</li>
              </ul>

              <span className="block font-semibold text-sm">Required Permissions:</span>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Camera access for proctoring</li>
                <li>Clipboard access for monitoring</li>
              </ul>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRules(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartQuiz}>
              Accept & Start Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
