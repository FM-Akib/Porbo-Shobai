import React from "react";
import { ArrowRight, Info, Trophy,Code,
    HelpCircle,
    Lightbulb,
    Video,
    Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";


const HostChip = () => {
    const competitionChips = [
        {
            title: "General & Case Competitions",
            description: "Organize and manage your competitions",
            link: "/create-competition",
            icon: Trophy,
            info: "Business Competitions, Case Competitions, General Competitions",
        },
        {
            title: "Hackathons & Coding Challenges",
            description: "Showcase your coding skills and creativity",
            link: "#hackathons",
            icon: Code,
            info: "Programming Contests, Problem Solving Challenges",
        },
        {
            title: "Quizzes",
            description: "Test your knowledge on various topics",
            link: "#quizzes",
            icon: HelpCircle,
            info: "Trivia, Subject-Based Quizzes, General Knowledge",
        },
        {
            title: "Innovation Challenges",
            description: "Bring your ideas to life and solve real-world problems",
            link: "#innovation-challenges",
            icon: Lightbulb,
            info: "Creative Thinking, Problem Solving, Product Design",
        },
        {
            title: "Webinars & Workshops",
            description: "Learn and grow with industry experts",
            link: "#webinars-workshops",
            icon: Video,
            info: "Skill Development, Expert Talks, Interactive Sessions",
        },
        {
            title: "Scholarships",
            description: "Explore and apply for various scholarship opportunities",
            link: "#scholarships",
            icon: Award,
            info: "Education Funding, Merit-Based Opportunities",
        },
    ];
    return (
        <>
        <h1 className="mt-6 md:mt-10 text-title font-bold text-balance text-2xl md:text-3xl text-center">What are you planning to host?</h1>
        <section className="grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2 max-w-4xl  mx-auto py-10 px-3 md:px-0">
            {
                competitionChips?.map((chip,index) => <Card key={index} className="w-full max-w-md transition-all hover:shadow-md dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
                    {React.createElement(chip.icon, { className: "h-6 w-6 text-red-500 dark:text-red-400" })}
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold leading-none tracking-tight">
                        {chip.title}
                    </h3>
                    <CardDescription className="mt-1">
                        {chip.description}
                    </CardDescription>
                    </div>
                </div>
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">More information</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{chip.info}</p>
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </CardHeader>
                <CardContent className="ms-12 md:ms-16">
                <Button
                    variant="link"
                    className="group h-auto p-0 text-primary "
                    asChild
                >
                    <Link to={chip.link} className="flex items-center  gap-2">
                    Create Competitions
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                </CardContent>
                </Card>)
            }
        </section>
        </>
    );
};

export default HostChip;