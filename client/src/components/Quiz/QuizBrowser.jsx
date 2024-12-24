import { CircleHelp, Clock1, NotepadText, SquareDashedKanban, TimerReset } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import CountdownCard from './CountdownCard';

export default function QuizBrowser({ quiz }) {
  const [showRules, setShowRules] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (quiz) {
      const timeRemaining = new Date(quiz.startDate).getTime() - new Date().getTime();
      setTimer(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [quiz]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => Math.max(prevTimer - 1000, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  

  const handleStartQuiz = async () => {
    try {
      // Request clipboard permission
      await navigator.permissions.query({ name: 'clipboard-read' });

      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream immediately

      // Navigate to quiz
      window.location.href = `/quiz/${quiz.id}`;
    } catch {
      alert('Camera and clipboard permissions are required to take the quiz');
    }
  };

  const quizStartTime = new Date(quiz.startDate).getTime();
  const quizEndTime = quizStartTime + quiz.duration * 60 * 1000; // Duration in milliseconds
  const currentTime = new Date().getTime();
  const isQuizExpired = currentTime > quizEndTime;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-semibold mb-6 flex items-center gap-1"><SquareDashedKanban className='h-5 w-5' />
      Available task will be displayed here...,</h1>

      <Card className="cursor-pointer shadow-none  ">
        <CardHeader>
          <CardTitle className="flex gap-1 items-center"><NotepadText className='h-5 w-5' />{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <p className="flex gap-1 items-center"><Clock1 className='h-5 w-5' />The quiz has a time limit of {quiz.duration} minutes.</p>
            <p className="flex gap-1 items-center"><CircleHelp className='h-5 w-5' />Questions: There are {quiz.questions.length} questions.</p>
          </div>
            {timer > 0 ? (
                <div className="">
                  <CountdownCard targetDateTime={quiz.startDate} />
              </div>
            ) : isQuizExpired ? (
              <div className="text-sm flex flex-col justify-center items-center gap-2 font-semibold">
                <TimerReset className='h-12 w-12' />
               <span className='text-xl bg-red-400 px-2 py-1 rounded-md text-white'>Expired</span> 
                </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => setShowRules(true)}
              >
                Take Quiz
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

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
                <li>The quiz has a time limit of {quiz.duration} minutes</li>
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
            <Button onClick={handleStartQuiz}>Accept & Start Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
