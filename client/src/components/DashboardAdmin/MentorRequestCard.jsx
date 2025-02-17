import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
const MentorRequestCard = ({image, name, gender, domain, mentorId}) => {
    const navigate = useNavigate();
    return (
        <Card
          className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={() => navigate(`/mentors/${mentorId}`)}
        >
          <Avatar className="w-16 h-16">
            <AvatarImage src={image} alt={name} />
           
          </Avatar>
          <CardContent className="space-y-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">Gender: {gender}</p>
            <p className="text-sm text-gray-500">Domain: {domain}</p>
          </CardContent>
        </Card>
    );
};

export default MentorRequestCard;