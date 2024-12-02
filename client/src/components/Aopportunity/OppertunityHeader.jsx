import { Badge, Globe, MapPin } from "lucide-react";

const OpportunityHeader = ({Aopportunity}) => {
    return (
        <div className="w-full">
        <div className="relative h-[300px] w-full overflow-hidden rounded-t-xl">
          <img
            src={Aopportunity?.banner}
            alt="Event banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="text-sm">
              {Aopportunity?.status}
            </Badge>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{Aopportunity?.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{Aopportunity?.subtitle}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{Aopportunity?.city} ({Aopportunity?.mode})</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a href={Aopportunity?.websiteUrl} className="text-sm hover:text-primary">{Aopportunity?.organization}</a>
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