import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {  BookOpen, Star, Trophy, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import WordRotate from "../ui/word-rotate";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {

    
    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:my-20">
        {/* Header Section */}

       
        <div className="mb-8 md:mb-12 h-full flex flex-col justify-center ">
            <DotPattern
            className={cn(
            "[mask-image:radial-gradient(300px_circle_at_left,white,transparent)]",
            )}
            />
          <div className="flex items-center gap-2 mb-4 ">
            <WordRotate
            className="text-3xl md:text-4xl mb-2 text-left font-bold text-black dark:text-white"
            words={["Unlock Opportunities, Rewards, and Redeem Knowledge.","Where Learning Meets Opportunity and Rewards.", "Compete, Learn, and Redeem Your Education.", "Opportunities, Mentorship, and Education at Your Fingertips!"]}
            />
            <div className="bg-primary/10 rounded-full p-1 hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className=" text-lg max-w-2xl pe-10 text-left">
            Porbo Shoabi connects students with <span className="bg-yellow-200 dark:bg-gray-800 px-1 py-1 rounded"> opportunities, competitions, and mentors.</span> Earn points through learning and redeem them for educational rewards.
          </p>

          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <Link>
            <Button className="w-full md:w-auto">Find Mentor</Button>
            </Link>
            <Link to="/create-mentor">
            <Button className="w-full md:w-auto">Be A Mentor</Button>
            </Link>
          </div>
        </div>
  
     
  
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-5 ">
        <DotPattern
            className={cn(
            "[mask-image:radial-gradient(300px_circle_at_right,white,transparent)]",
            )}
            />

          {/* Mentorship Card */}
          <Card className="bg-[url(https://res.cloudinary.com/ds0io6msx/image/upload/v1733207778/ggu2g1ezfid8h5ibvmfm.png)] bg-cover border-none hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5" />
                Mentorship
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p className="font-medium">Guidance From <br /> Top Mentors</p>
              <Badge variant="secondary" className="mt-2">2000+ Mentors</Badge>
            </CardContent>
          </Card>
  
          {/* Courses Card */}
          <Card className="bg-[url(https://res.cloudinary.com/ds0io6msx/image/upload/v1733208973/ahv2ro1vc6xgkplt7vjb.png)] bg-cover border-none hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 " />
                Module
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-white">Learn from Course
              <br />  and Module</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Course</Badge>
                <Badge variant="secondary">Stars</Badge>
              </div>
            </CardContent>
          </Card>
  
          {/* Compete Card */}
          <Card className="bg-[url(https://res.cloudinary.com/ds0io6msx/image/upload/v1733208491/ozbrl5h9noduordsxasg.png)] bg-cover border-none hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Trophy className="h-5 w-5" />
                Compete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-white">Compete. Conquer. <br /> Celebrate.</p>
              <Badge variant="secondary" className="mt-2">200+ Challenges</Badge>
            </CardContent>
          </Card>
  
          {/* Practice Card */}
          <Card className="bg-[url(https://res.cloudinary.com/ds0io6msx/image/upload/v1733209916/jtbuvkly72ihzk3kskad.gif)] bg-cover border-none hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Star className="h-5 w-5" />
                Redeem Points
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p className="font-medium">Exchange your points <br /> for rewards</p>
              <Badge variant="secondary" className="mt-2">200+ Rewards</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    );
};

export default Hero;