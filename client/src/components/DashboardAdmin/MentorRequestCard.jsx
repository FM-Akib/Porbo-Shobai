import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const MentorRequestCard = ({ mentor }) => {
  const navigate = useNavigate();
  const {
    _id,
    firstName,
    lastName,
    gender,
    organisation,
    domain,
    linkedinUrl,
    facebookUrl,
    youtubeUrl,
    image,
  } = mentor;

  return (
    <Card className="relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-lg cursor-pointer">
      <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
        {/* Avatar */}
        <Avatar className="w-full md:w-16 md:h-16   ">
          <AvatarImage
            src={image}
            alt={`${firstName} ${lastName}`}
            className="rounded-lg" // Slightly rounded image
          />
        </Avatar>

        {/* Mentor Details */}
        <div className="space-y-1 flex-1">
          <h3 className="text-lg font-semibold">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-600">Gender: {gender}</p>
          <p className="text-sm text-gray-600">Domain: {domain}</p>
          <p className="text-sm text-gray-600">Organization: {organisation}</p>
        </div>

        {/* Social Links and Button */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Social Links */}
          <div className="flex gap-2">
            {linkedinUrl && (
              <Link to={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-700 text-xl hover:scale-110 transition-all" />
              </Link>
            )}
            {facebookUrl && (
              <Link to={facebookUrl} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-500 text-xl hover:scale-110 transition-all" />
              </Link>
            )}
            {youtubeUrl && (
              <Link to={youtubeUrl} target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-red-600 text-xl hover:scale-110 transition-all" />
              </Link>
            )}
          </div>

          {/* View Profile Button */}
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/mentor-candidate-profile/${_id}`);
            }}
            className="md:ml-auto" // Align button to the right on larger screens
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorRequestCard;