import BrowseParticipants from "@/components/Quiz/BrowseParticipants";
import QuizBrowser from "@/components/Quiz/QuizBrowser";
import QuizCreator from "@/components/Quiz/QuizCreator";
import Loader from "@/components/shared/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOpportunitiesByIdsQuery } from "@/redux/api/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AddQuiz = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("browse"); // Default tab

  const {
      data,
      isLoading,
      isError,
  } = useGetOpportunitiesByIdsQuery([id]);
  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>
  const opportunity = data[0];
  const { title } = opportunity;


  const handleEditTask = () => {// Set the task to be edited
    setActiveTab("create"); // Switch to the "Create Quiz" tab
  };
 
    return (
        <div className="min-h-screen ">
        <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-5">Quiz Platform</h1>
        <p className="text-lg text-center mb-8">Welcome to the Quiz Platform for 
            <span className="bg-pink-100 dark:bg-yellow-600 mx-2 px-1 rounded-sm">{title}</span></p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="task">Task Browser</TabsTrigger>
            <TabsTrigger value="browse">Participants</TabsTrigger>
            <TabsTrigger value="create">Create Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="task">
            <QuizBrowser 
            opportunity={opportunity}
            onEditTask={handleEditTask}
            />
          </TabsContent>
          
          <TabsContent value="browse">
            <BrowseParticipants 
            opportunity={opportunity}
            />
          </TabsContent>
          
          <TabsContent value="create">
            <QuizCreator 
            opportunity={opportunity} 
             />
          </TabsContent>
        </Tabs>
      </div>
    </div>
    );
};

export default AddQuiz;