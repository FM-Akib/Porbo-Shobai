import { toast } from '@/Hooks/use-toast';
import useUserInfo from '@/Hooks/useUserInfo';
import { CircleHelp, ClipboardList, Clock1, FilePenLine, NotepadText, ShieldAlert, TimerReset, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { ToastAction } from '../ui/toast';
import CountdownCard from './CountdownCard';

export default function QuizBrowser({ opportunity,onEditTask }) {
  const [showRules, setShowRules] = useState(false);
  const [showAuth, setAuth] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const location = useLocation();
  useEffect(() => {
    if (opportunity?.task) {
      const timeRemaining = new Date(opportunity?.task.startDate).getTime() - new Date().getTime();
      setTimer(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [opportunity?.task]);

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
      // window.location.href = `/quiz/${opportunity?.task.id}`;
      navigate("/quiz/psq", { state: { opportunity } });

    } catch {
      alert('Camera and clipboard permissions are required to take the quiz');
    }
  };

  const quizStartTime = new Date(opportunity?.task.startDate).getTime();
  const quizEndTime = quizStartTime + opportunity?.task.duration * 60 * 1000; // Duration in milliseconds
  const currentTime = new Date().getTime();
  const isQuizExpired = currentTime > quizEndTime;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const password = e.target.secretKey.value;
    const email = e.target.email.value;
    if(!email || !password) return toast({
      variant: "destructive",
      title: "Empty fields.",
      description: "Please fill in all fields.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    })

    if(opportunity?.participationType==='individual'){
      const isMatch = opportunity?.participants?.some(user => user.email.includes(email)) 
      && opportunity?.task.secretKey === password;
      if(isMatch){
        // handleStartQuiz();
        setShowRules(true);
      }
      else{
        toast({
          variant: "destructive",
          title: <p className="flex items-center gap-1"><ShieldAlert className='size-4' /> <span >Access Denied</span></p>,
          description: "Email or secret key is incorrect.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
    else{
      const isMatch = opportunity?.participants?.members.some(user => user.email.includes(email)) 
      && opportunity?.task.secretKey === password;
      if(isMatch){
        // handleStartQuiz();
        setShowRules(true);
      }
      else{
        toast({
          variant: "destructive",
          title: <p className="flex items-center gap-1"><ShieldAlert  className='size-4' /> <span >Access Denied</span></p>,
          description: "Email or secret key is incorrect.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
  };
  const handleDeleteTask = () => {
   console.log('delete task')
  }
  
  

  return (
    <div className="container mx-auto p-6">
      
      <Card className="cursor-pointer shadow-none 
       bg-[url('https://res.cloudinary.com/ds0io6msx/image/upload/v1735102760/vrlx6bc0879rsyccpxg3.png')]
        bg-contain  md:bg-right bg-no-repeat
      ">
        <CardHeader>
          <CardTitle className="flex gap-1 items-center"><NotepadText className='h-5 w-5' />{opportunity?.task.title}</CardTitle>
          <CardDescription>{opportunity?.task.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <p className="flex gap-1 items-center"><Clock1 className='h-5 w-5' />The quiz has a time limit of {opportunity?.task.duration} minutes.</p>
            <p className="flex gap-1 items-center"><CircleHelp className='h-5 w-5' />Questions: There are {opportunity?.task.questions.length} questions.</p>
            {
              userInfo?.role==='company' && location.pathname===`/dashboard/add-quiz/${opportunity?._id}` && (
                <div className="flex gap-2 md:gap-4 items-center">
                
                <Button onClick={onEditTask} className="w-fit  mt-2 bg-green-500"><FilePenLine />Edit</Button>
              
                {/* deleting the task */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <Button className="w-fit  mt-2 bg-red-500"><Trash2 />Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteTask}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                </div>
              )
            }

          
          </div>
            {timer > 0 ? (
                <div className="">
                  <CountdownCard targetDateTime={opportunity?.task.startDate} />
              </div>
            ) : isQuizExpired ? (
              <div className="text-sm flex flex-col justify-center items-center gap-2 font-semibold">
                <TimerReset className='h-12 w-12' />
               <span className='text-xl bg-red-400 px-2 py-1 rounded-md text-white'>Expired</span> 
                </div>
            ) : (
              <Button
                className="w-1/2 relative rounded"
                onClick={() => setAuth(true)}
                // onClick={() => setShowRules(true)}
              >
                  <span className="absolute top-0 right-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
               <ClipboardList /> Enter Task
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAuth} onOpenChange={setAuth}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authenticate Yourself</DialogTitle>
          <DialogDescription>
            Enter email that you used to register for the quiz and secret key sent to your email.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAuthSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email"
            placeholder="Email that you used to register"
            className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="secretKey" className="text-right">
              Secret Key
            </Label>
            <Input id="secretKey" placeholder="Secret Key"  className="col-span-3" />
          </div>
        </div>
        <DialogFooter >
          <Button type="submit"
          onClick={() => setAuth(false)}
          >Submit</Button>
        </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>

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
                <li>The quiz has a time limit of {opportunity?.task.duration} minutes</li>
                <li>You cannot leave the opportunity?.task page once started</li>
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
