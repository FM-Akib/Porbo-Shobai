import { CalendarIcon, Dot, ExternalLink, Handshake, MousePointerClick, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
let prize=0;
const OpportunityCard = ({opportunity}) => {
  console.log(opportunity);
    const bannerAnimation = "bg-gradient-to-r from-[#5b0505] via-[#72150d] to-[#ff7d02]"

    return (
      <Card className="w-full max-w-sm overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
            {/* Animated Banner */}
            <div className={cn("h-fit py-1 text-center text-white font-semibold w-full", bannerAnimation)}>{opportunity.opportunityType}</div>
            
            {/* Main Image */}
            <div className="relative overflow-hidden">
              <img
              src={opportunity.banner}
              alt="Fallback Image"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if fallback also fails
                e.target.src = "https://res.cloudinary.com/ds0io6msx/image/upload/v1733134035/wqux5fkhs6ctl0mxzabe.png";
              }}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />

              <div className={`${opportunity.status === "Live" ? "bg-green-600" : "bg-red-500"} absolute top-2 right-2 text-white 
              font-semibold px-2 py-1 rounded-sm flex  z-10 `}>
                <Dot className="animate-ping" />{opportunity.status}</div>
            </div>
    
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
              <p className="text-lg text-gray-800 dark:text-gray-200 flex items-center gap-1">
              <Handshake className="text-orange-500" /> <span className="bg-gray-100 dark:bg-gray-700 px-2 rounded">{opportunity.organization}</span> presents
                </p>

                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold tracking-tight dark:text-white">{opportunity.title}</h2>
                </div>
             
              </div>
    
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{opportunity.participationType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  {(() => {
                    const registrationEndDate = new Date(opportunity.registrationEndDate);
                    const currentDate = new Date();
                    
                    const timeDifference = registrationEndDate - currentDate;
                    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                    // console.log(`There are ${daysDifference} days left until the registration ends.`);
                    return <span className="text-sm text-gray-500 dark:text-gray-400">{daysDifference} days left</span>;
                  })()}
                </div>
              </div>
    
              <div className="flex items-center justify-between">
                {(() => {
                  prize = 0;
                  opportunity?.prizes?.forEach((p) => {
                    prize += p.prizeAmount;
                  });
                })()}
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400"><span className="text-xl font-extrabold">৳</span> {prize}</span>
                <div className="space-x-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    {opportunity?.categories[0]}
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                  {opportunity?.categories[1]}
                  </Badge>
                </div>
              </div>
            </CardContent>
    
            <CardFooter className="bg-gray-100 dark:bg-gray-600/50 p-4 grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 justify-center bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transform hover:-translate-y-0.5 transition-all duration-200 dark:bg-orange-700 dark:hover:bg-orange-600">
                Register Now <MousePointerClick className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-2 justify-center bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transform hover:-translate-y-0.5 transition-all duration-200 dark:bg-orange-700 dark:hover:bg-orange-600">
                See More <ExternalLink className="h-4 w-4"/>
              </button>
            </CardFooter>
      </Card>
    )
};

export default OpportunityCard;