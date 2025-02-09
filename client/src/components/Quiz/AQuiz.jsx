import { toast } from '@/Hooks/use-toast';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useUserInfo from '@/Hooks/useUserInfo';
import { uploadImageToCloud } from '@/lib/uploadImageToCloud';
import { AlertCircle, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { ToastAction } from '../ui/toast';

const AQuiz = () => {
  const { userInfo } = useUserInfo();
  const location = useLocation();
  const { opportunity } = location.state || {};
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [screenshots, setScreenshots] = useState([]);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Load quiz data
    // const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    // const currentQuiz = quizzes.find(q => q.id === parseInt(quizId))
    const currentQuiz = opportunity?.task;
    if (currentQuiz) {
      setQuiz(currentQuiz);
      setTimeLeft(currentQuiz.duration * 60);
      setAnswers(new Array(currentQuiz.questions.length).fill(''));
    }
    // Cleanup when navigating away
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [opportunity?.task]);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access error:', error);
      return false;
    }
    return true;
  };

  const setupClipboardPermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: 'clipboard-read',
      });
      return result.state === 'granted' || result.state === 'prompt';
    } catch (error) {
      console.error('Clipboard permission error:', error);
      return false;
    }
  };

  const handleStartQuiz = async () => {
    const cameraAccess = await setupCamera();
    const clipboardAccess = await setupClipboardPermission();

    if (!cameraAccess || !clipboardAccess) {
      alert('Camera and clipboard permissions are required to take the quiz');
      return;
    }

    setHasStarted(true);
    setShowStartDialog(false);

    // Setup clipboard monitoring
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('paste', handleCopy);

    // Define the total duration for the task (10 minutes for this case)
    const durationInMinutes = opportunity?.task?.duration || 10; // Default to 10 minutes if not defined
    const totalDurationMs = durationInMinutes * 60 * 1000; // Convert to milliseconds

    // Ensure it takes two random screenshots within the first 10 minutes
    const screenshotTimes = [
      (Math.random() * totalDurationMs) / 2, // Random time in the first half
      (Math.random() * totalDurationMs) / 2 + totalDurationMs / 2, // Random time in the second half
    ];

    console.log(
      `Random screenshot times (ms): ${screenshotTimes.map(time =>
        Math.round(time),
      )}`,
    );

    // Schedule two random screenshots
    const screenshotTimeouts = screenshotTimes.map((time, index) =>
      setTimeout(() => {
        takeScreenshot(index + 1); // Screenshot 1 and 2
      }, time),
    );

    // Cleanup function
    return () => {
      // Clear all scheduled timeouts
      screenshotTimeouts.forEach(timeout => clearTimeout(timeout));
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('paste', handleCopy);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  };

  const takeScreenshot = async (index = null) => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

      // Convert canvas content to Blob
      canvas.toBlob(blob => {
        if (blob) {
          // Create a File object from the Blob
          const file = new File(
            [blob],
            `screenshot-${index || Date.now()}.jpeg`,
            {
              type: 'image/jpeg',
            },
          );

          // Log the file or handle it as needed
          console.log('Screenshot File:', file);
          uploadImageToCloud(file).then(imageUrl => {
            setScreenshots(prev => [...prev, imageUrl]); // Save the file to state or upload
          });

          if (index !== null) {
            console.log(
              `Screenshot ${index} taken at: ${new Date().toLocaleTimeString()}`,
            );
          }
        } else {
          console.error('Failed to create a blob from canvas.');
        }
      }, 'image/jpeg'); // Specify the MIME type
    } else {
      console.error('No video reference available to take a screenshot.');
    }
  };

  //   const handleStartQuiz = async () => {
  //     const cameraAccess = await setupCamera()
  //     const clipboardAccess = await setupClipboardPermission()

  //     if (!cameraAccess || !clipboardAccess) {
  //       alert('Camera and clipboard permissions are required to take the quiz')
  //       return
  //     }

  //     setHasStarted(true)
  //     setShowStartDialog(false)

  //     // Setup clipboard monitoring
  //     document.addEventListener('copy', handleCopy)
  //     document.addEventListener('cut', handleCopy)
  //     document.addEventListener('paste', handleCopy)

  //     // Setup random screenshots
  //     const screenshotInterval = setInterval(takeScreenshot, Math.random() * 5000 + 5000)

  //     return () => {
  //       clearInterval(screenshotInterval)
  //       document.removeEventListener('copy', handleCopy)
  //       document.removeEventListener('cut', handleCopy)
  //       document.removeEventListener('paste', handleCopy)
  //       if (streamRef.current) {
  //         streamRef.current.getTracks().forEach(track => track.stop())
  //       }
  //     }
  //   }

  //   const takeScreenshot = async () => {
  //     if (videoRef.current) {
  //       const canvas = document.createElement('canvas')
  //       canvas.width = videoRef.current.videoWidth
  //       canvas.height = videoRef.current.videoHeight
  //       canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
  //       const screenshot = canvas.toDataURL('image/jpeg')
  //       setScreenshots(prev => [...prev, screenshot])
  //     }
  //   }

  const handleCopy = e => {
    e.preventDefault();
    alert('Copying is not allowed during the quiz!');
  };

  const handleSubmit = () => {
    const participant = opportunity?.participants.find(
      p => p.email === userInfo.email,
    );
    const attempts = {
      ...participant,
      answers,
      screenshots,
      timestamp: new Date().toISOString(),
      timeSpent: quiz.duration * 60 - timeLeft,
    };
    opportunity.task.attempts.push(attempts);
    const updatedOpportunity = {
      ...opportunity,
    };

    console.log(attempts);

    axiosSecure
      .patch(`/opportunities/${opportunity._id}`, updatedOpportunity)
      .then(response => {
        if (response?.data?.modifiedCount) {
          toast({
            variant: 'default',
            title: 'Congratulations!',
            description: 'You have successfully completed the quiz.',
            action: <ToastAction altText="ok">OK!</ToastAction>,
          });
          window.location.href = `/`;
        }
      })
      .catch(error => {
        console.log(error);
      });

    // const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    // const updatedQuizzes = quizzes.map(q => {
    //   if (q.id === parseInt(quizId)) {
    //     return {
    //       ...q,
    //       attempts: [...(q.attempts || []), attempt]
    //     }
    //   }
    //   return q
    // })

    // localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes))
    // window.location.href = `/quiz/${quizId}/results`
  };

  if (!quiz) return <div>Loading...</div>;

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <>
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Quiz</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 mt-4">
                <div className="text-sm">
                  Before starting the quiz, please note:
                </div>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Time limit: {quiz.duration} minutes</li>
                  <li>Total questions: {quiz.questions.length}</li>
                  <li>Camera monitoring will be active</li>
                  <li>Copying and pasting is not allowed</li>
                </ul>
                <div className="text-sm">
                  Click Start when you&apos;re ready to begin.
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleStartQuiz}>Start Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <div className="flex items-center gap-2 text-xl font-mono">
              <Clock className="h-5 w-5" />
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <Progress value={(currentQuestion / quiz.questions.length) * 100} />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span>
              {Math.round((currentQuestion / quiz.questions.length) * 100)}%
              Complete
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  {currentQuestionData.question}
                </h2>

                {currentQuestionData.image && (
                  <img
                    src={currentQuestionData.image}
                    alt="Question"
                    className="max-h-60 rounded-lg mx-auto"
                  />
                )}

                {currentQuestionData.type === 'multiple' ? (
                  <RadioGroup
                    value={answers[currentQuestion]}
                    onValueChange={value => {
                      const newAnswers = [...answers];
                      newAnswers[currentQuestion] = value;
                      setAnswers(newAnswers);
                    }}
                  >
                    {currentQuestionData.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                        />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Textarea
                    value={answers[currentQuestion]}
                    onChange={e => {
                      const newAnswers = [...answers];
                      newAnswers[currentQuestion] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    placeholder="Type your answer here..."
                    className="min-h-[100px]"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full rounded-lg"
                />
                <div className="text-sm text-muted-foreground mt-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Camera monitoring active
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className="flex-1"
              >
                Previous
              </Button>
              {currentQuestion === quiz.questions.length - 1 ? (
                <Button onClick={handleSubmit} className="flex-1">
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="flex-1"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AQuiz;
