import { toast } from '@/Hooks/use-toast'
// import useAxiosSecure from '@/Hooks/useAxiosSecure'
import { uploadImageToCloud } from '@/lib/uploadImageToCloud'
import { useUpdateOpportunityMutation } from '@/redux/api/api'
import { ClipboardList, Clock, FileText, LaptopMinimalCheck, LoaderPinwheel, MinusCircle, PlusCircle, Rocket, SquareAsterisk } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Textarea } from "../ui/textarea"
import { ToastAction } from '../ui/toast'

export default function QuizCreator({opportunity}) {
  const [quizData, setQuizData] = useState({
    title: opportunity?.task?.title || '',
    secretKey: opportunity?.task?.secretKey || '',
    startDate: opportunity?.task?.startDate || new Date().toISOString(),
    description: opportunity?.task?.description || '',
    duration: 30,
    questions: opportunity?.task?.questions || [
      {
        type: 'multiple',
        question: '',
        image: null,
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1 // Default points
      }
    ],
  })
  
  // const axiosSecure =  useAxiosSecure();
  // const [loading, setLoading] = useState(false)
  const [updateOpportunity, {isLoading}] = useUpdateOpportunityMutation()
  // if(isLoading){
  //   setLoading(true)
  // }
  const handleImageUpload = (questionIndex, e) => {
    const file = e.target.files[0]
    if (file) {
      uploadImageToCloud(file)
        .then(imageUrl => {
        const newQuestions = [...quizData.questions]
        newQuestions[questionIndex].image = imageUrl
        setQuizData({ ...quizData, questions: newQuestions })
        })
    }
  }

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          type: 'multiple',
          question: '',
          image: null,
          options: ['', '', '', ''],
          correctAnswer: 0,
          points: 1 // Default points
        }
      ]
    })
  }

  const removeQuestion = (index) => {
    const newQuestions = quizData.questions.filter((_, i) => i !== index)
    setQuizData({ ...quizData, questions: newQuestions })
  }

  const handlePublish = async () => {
    // const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    // setLoading(true)
    const newQuiz = {
      ...quizData,
      
      createdAt: new Date().toISOString(),
      attempts: []
    }
    // localStorage.setItem('quizzes', JSON.stringify([...quizzes, newQuiz]))
    // console.log(quizData)
    const updatedOpportunity = {
      ...opportunity,
      task: {...newQuiz}
    }
    try {
      const response = await updateOpportunity({
        id: opportunity._id,
        updatedOpportunity,
      }).unwrap(); // Unwrap to handle promise resolution/rejection

      if (response?.modifiedCount) {
        toast({
          variant: "default",
          title: "Task Upload",
          description: "Task uploaded successfully",
          action: <ToastAction altText="ok">OK!</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload task. Please try again.",
        action: <ToastAction altText="retry">Retry</ToastAction>,
      });
    }
    // axiosSecure.patch(`/opportunities/${opportunity._id}`, updatedOpportunity)
    //   .then(response  => {
    //     if (response?.data?.modifiedCount ) {
    //       toast({
    //         variant: "default",
    //         title: "Task Upload",
    //         description: "Task uploaded successfully",
    //         action: <ToastAction altText="ok">OK!</ToastAction>,
    //       })
         
    //       setLoading(false)
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })     


    // alert('Quiz published successfully!')
    setQuizData({
      title: '',
      startDate: new Date(),
      secretKey: '',
      description: '',
      duration: 30,
      questions: [
        {
          type: 'multiple',
          question: '',
          image: null,
          options: ['', '', '', ''],
          correctAnswer: 0,
          points: 1 // Default points
        }
      ]
    })
  }
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl text-center font-bold mb-6 flex items-center justify-center gap-2">
        <LaptopMinimalCheck className='size-8' /> Quiz Creator</h1>
      
      <div className="space-y-6">
        <div className="grid gap-4 bg-white dark:bg-gray-900 border rounded-lg  p-6">
          <div className="space-y-2">
            <Label htmlFor="title" >
            <ClipboardList className="inline-block h-5 w-5 mr-1 text-muted-foreground" />
                Quiz Title</Label>
            <Input
              id="title"
              value={quizData.title}
              onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
              placeholder="Enter quiz title"
            />
          </div>
          <Label htmlFor="startDate">
          <Clock className="inline-block h-5 w-5 mr-1 text-muted-foreground" />
            Start Date & Time</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={quizData.startDate}
              onChange={(e) => setQuizData({ ...quizData, startDate: e.target.value })}
              placeholder="Select date and time"
            />
          
          <div className="space-y-2">
            <Label htmlFor="description">
            <FileText className="inline-block h-5 w-5 mr-1 text-muted-foreground" />
                Description</Label>
            <Textarea
              id="description"
              value={quizData.description}
              onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
              placeholder="Enter quiz description"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">
            <Clock className="inline-block h-5 w-5 mr-1 text-muted-foreground" />
                Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={quizData.duration}
              onChange={(e) => setQuizData({ ...quizData, duration: parseInt(e.target.value) })}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secretKey" >
            <SquareAsterisk className="inline-block h-5 w-5 mr-1 text-muted-foreground" />
                Secret Key for Quiz</Label>
            <Input
              id="secretKey"
              value={quizData.secretKey}
              onChange={(e) => setQuizData({ ...quizData, secretKey: e.target.value })}
              placeholder="Enter a secret key for participants"
            />
          </div>
        </div>

        <div className="space-y-6">
          {quizData.questions.map((question, questionIndex) => (
            <Card key={questionIndex} className="relative shadow-none">
              <CardContent className="pt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => removeQuestion(questionIndex)}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <RadioGroup
                      value={question.type}
                      onValueChange={(value) => {
                        const newQuestions = [...quizData.questions]
                        newQuestions[questionIndex].type = value
                        setQuizData({ ...quizData, questions: newQuestions })
                      }}
                      className="grid grid-cols-2 space-x-2"
                    >
                      <div className="flex items-center space-x-2 border p-5 rounded-md ">
                        <RadioGroupItem value="multiple" id={`multiple-${questionIndex}`} />
                        <Label htmlFor={`multiple-${questionIndex}`}>
                            Multiple Choice</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-5 rounded-md">
                        <RadioGroupItem value="written" id={`written-${questionIndex}`} />
                        <Label htmlFor={`written-${questionIndex}`}>Written</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Textarea
                      value={question.question}
                      onChange={(e) => {
                        const newQuestions = [...quizData.questions]
                        newQuestions[questionIndex].question = e.target.value
                        setQuizData({ ...quizData, questions: newQuestions })
                      }}
                      placeholder="Enter your question"
                    />
                  </div>

                  <div>
                    <Label>Image (Optional)</Label>
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(questionIndex, e)}
                        className="cursor-pointer "
                        id={`image-${questionIndex}`}
                      />
                      {/* <Label
                        htmlFor={`image-${questionIndex}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Button type="button" variant="outline">
                          <ImagePlus className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      </Label> */}
                      {question.image && (
                        <img
                          src={question.image}
                          alt="Question"
                          className="mt-2 max-h-40 rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Set Points</Label>
                    <Input
                      type="number"
                      value={question.points}
                      onChange={(e) => {
                        const newQuestions = [...quizData.questions]
                        newQuestions[questionIndex].points = parseInt(e.target.value) || 0
                        setQuizData({ ...quizData, questions: newQuestions })
                      }}
                      placeholder="Enter points for this question"
                      min="0"
                    />
                  </div>

                  {question.type === 'multiple' && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      <RadioGroup
                        value={question.correctAnswer.toString()}
                        onValueChange={(value) => {
                          const newQuestions = [...quizData.questions]
                          newQuestions[questionIndex].correctAnswer = parseInt(value)
                          setQuizData({ ...quizData, questions: newQuestions })
                        }}
                      >
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <RadioGroupItem value={optionIndex.toString()} />
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newQuestions = [...quizData.questions]
                                newQuestions[questionIndex].options[optionIndex] = e.target.value
                                setQuizData({ ...quizData, questions: newQuestions })
                              }}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addQuestion} className="w-full" size="lg">
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </div>
          {
            isLoading ?  <Button  className="w-full" size="lg">
            Publishing ... <LoaderPinwheel className='animate-spin h-5 w-5 ml-1' />
          </Button> :  <Button onClick={handlePublish} className="w-full" size="lg">
          Publish Quiz <Rocket className="h-4 w-4 ml-1" />
        </Button>
          }
       
      </div>
    </div>
  )
}
