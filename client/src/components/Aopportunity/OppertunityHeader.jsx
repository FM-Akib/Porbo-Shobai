import {  BadgeInfo, Globe, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

const OpportunityHeader = ({Aopportunity}) => {
    return (
        <div className="w-full">
        <div className="relative h-[300px] md:h-fit w-full overflow-hidden rounded-t-xl">
          <img
            src={Aopportunity?.banner}
            alt="Opportunity Banner"
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://res.cloudinary.com/ds0io6msx/image/upload/v1733134035/wqux5fkhs6ctl0mxzabe.png";
          }}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="text-sm bg-green-600 text-white">
              {Aopportunity?.status}
            </Badge>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{Aopportunity?.title}</h1>
            <div className="flex flex-col justify-between  md:flex-row">
            <p className="text-lg text-muted-foreground mt-2">{Aopportunity?.subtitle}</p>
            <p className="text-md text-muted-foreground mt-2">Sit Limit - {Aopportunity?.numOfParticipantsAllowed}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{Aopportunity?.city==='City'?'':Aopportunity?.city} ({Aopportunity?.mode})</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <Link to={Aopportunity?.websiteUrl} className="text-sm hover:text-primary flex items-center gap-2">
              {Aopportunity?.organization}  <SquareArrowOutUpRight className="h-4 w-4" /></Link>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BadgeInfo className="h-4 w-4" />
              <span className="text-sm hover:text-primary flex items-center gap-2">
              {Aopportunity?.eligibility} </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {Aopportunity?.categories?.map((category, index) => (
              <Badge key={index} variant="outline">{category}</Badge>
            ))}
          </div>
        </div>
      </div>
    );
};

export default OpportunityHeader;