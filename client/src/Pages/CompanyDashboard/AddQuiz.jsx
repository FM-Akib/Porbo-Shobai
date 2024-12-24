import QuizBrowser from "@/components/Quiz/QuizBrowser";
import QuizCreator from "@/components/Quiz/QuizCreator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

const AddQuiz = () => {
  const location = useLocation();
  const { opportunities } = location.state || {}; 
  const { title } = opportunities[0];
    return (
        <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-5">Quiz Platform</h1>
        <p className="text-lg text-center mb-8">Welcome to the Quiz Platform for 
            <span className="bg-pink-100 mx-2 px-1 rounded-sm">{title}</span></p>
        
        <Tabs defaultValue="browse" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Quizzes</TabsTrigger>
            <TabsTrigger value="create">Create Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <QuizBrowser />
          </TabsContent>
          
          <TabsContent value="create">
            <QuizCreator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    );
};

export default AddQuiz;