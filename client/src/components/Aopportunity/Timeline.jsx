import { CalendarClock } from 'lucide-react';
import { Card } from '../ui/card';

const Timeline = ({Aopportunity}) => {
    return (
    <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Important Dates
        </h2>
        <div className="space-y-4">
            
            <div className="flex items-start gap-4">
                <div className="min-w-2 h-2 w-2 mt-2 rounded-full bg-primary" />
                <div>
                <h3 className="font-medium">Registration Starts</h3>
                <p className="text-sm text-muted-foreground">{new Date(Aopportunity?.registrationStartDate).toDateString()} {new Date(Aopportunity?.registrationStartDate).toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="min-w-2 h-2 w-2 mt-2 rounded-full bg-primary" />
                <div>
                <h3 className="font-medium">Registration Ends</h3>
                <p className="text-sm text-muted-foreground">{new Date(Aopportunity?.registrationEndDate).toDateString()} {new Date(Aopportunity?.registrationEndDate).toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="min-w-2 h-2 w-2 mt-2 rounded-full bg-primary" />
                <div>
                <h3 className="font-medium">Competition Starts</h3>
                <p className="text-sm text-muted-foreground">{new Date(Aopportunity?.competitionStartDate).toDateString()} {new Date(Aopportunity?.competitionStartDate).toLocaleTimeString()}</p>
                </div>
            </div>
           
        </div>
        </Card>
    );
};

export default Timeline;