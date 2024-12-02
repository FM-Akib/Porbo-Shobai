import { CalendarIcon, EyeIcon, GamepadIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const OpportunityCard = () => {
    const bannerAnimation = "bg-gradient-to-r from-[#FF930F] to-[#FFF95B] filter"

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
            {/* Animated Banner */}
            <div className={cn("h-2 w-full", bannerAnimation)}></div>
            
            {/* Main Image */}
            <div className="relative overflow-hidden">
              <img 
                src="https://res.cloudinary.com/ds0io6msx/image/upload/v1733078216/dutvowveyo090zguarga.png" 
                alt="Gaming Controllers"
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
             
            </div>
    
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <GamepadIcon className="h-5 w-5 text-orange-500" />
                  <h2 className="text-2xl font-bold tracking-tight dark:text-white">FIFA 24</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  International School of Business & Media, Pune
                </p>
              </div>
    
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">876 Impressions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">29 days left</span>
                </div>
              </div>
    
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-orange-600 dark:text-orange-400">₹10,000</span>
                <div className="space-x-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    Gaming
                  </Badge>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    All
                  </Badge>
                </div>
              </div>
            </CardContent>
    
            <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-4">
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transform hover:-translate-y-0.5 transition-all duration-200 dark:bg-orange-700 dark:hover:bg-orange-600">
                Register Now
              </button>
            </CardFooter>
          </Card>
        </div>
      )
};

export default OpportunityCard;