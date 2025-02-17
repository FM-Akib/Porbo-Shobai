import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import {
    AtomIcon,
    BookPlus,
  Facebook,
  Languages,
  Link2Icon,
  Linkedin,
  OrigamiIcon,
  Phone,
  School,
  SparkleIcon,
  University,
  Workflow,
  Youtube,
} from "lucide-react";
import { FaGenderless } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const MentorCandidateProfile = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: mentor = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mentor"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mentors/${params.id}`);
      return data;
    },
  });

  if (isLoading) return <p className="text-center">Loading mentors...</p>;

  if (isError)
    return <p className="text-center text-red-500">Failed to fetch mentors.</p>;

  const {
    firstName,
    lastName,
    gender,
    mobileNo,
    organisation,
    domain,
    workExperience,
    languages,
    linkedinUrl,
    facebookUrl,
    youtubeUrl,
    protfolioUrl,
    content,
    banner,
    schoolName,
    collegeName,
    universityName,
    skills,
    topics,
    userId,
    status,
    _id,
  } = mentor;


  const handleMakeMentor = async () => {
       
    console.log("handel mentor hits");

    try {  
      const result = await axiosSecure.patch(`/mentors/${userId}`, { mentor });
      const statusResult = await axiosSecure.patch(`/mentor-status/${_id}`, { status });
      console.log(result, statusResult);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-4">
      <MentorDashboardTitle title="Candidate Profile" />
      <hr className="my-8" />

      <div>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 md:h-52 md:w-52 rounded-full">
                <AvatarImage
                  src={banner || "/placeholder.svg"}
                  className="rounded-full h-24 w-24 md:h-52 md:w-52"
                />
                <AvatarFallback>
                  {firstName?.[0]}
                  {lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {content || "Add your username"}
                </p>
              </div>
            </div>
            <hr className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <Phone className="mr-3 h-5 w-5" /> Mobile Number :{" "}
                    </span>
                    <p>{mobileNo || 0}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <Linkedin className="mr-3 h-5 w-5" /> LinkedIn :{" "}
                    </span>
                    {linkedinUrl ? (
                      <Link
                        to={`${linkedinUrl}`}
                        target="_blank"
                        className="underline text-blue-400 hover:text-blue-700 inline-block max-w-[200px] truncate"
                      >
                        {linkedinUrl}
                      </Link>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      <Link2Icon className="mr-3 h-5 w-5" />
                      Portfolio :{" "}
                    </span>
                    {protfolioUrl ? (
                      <Link
                        to={`${protfolioUrl}`}
                        target="_blank"
                        className="underline text-blue-400 hover:text-blue-700 inline-block max-w-[200px] truncate"
                      >
                        {protfolioUrl}
                      </Link>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      <Facebook className="mr-3 h-5 w-5" />
                      Facebook :{" "}
                    </span>
                    {facebookUrl ? (
                      <Link
                        to={`${facebookUrl}`}
                        target="_blank"
                        className="underline text-blue-400 hover:text-blue-700 inline-block max-w-[200px] truncate"
                      >
                        {facebookUrl}
                      </Link>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <Youtube className="mr-3 h-5 w-5" />
                      Youtube :{" "}
                    </span>
                    {youtubeUrl ? (
                      <Link
                        to={`${youtubeUrl}`}
                        target="_blank"
                        className="underline text-blue-400 hover:text-blue-700 inline-block max-w-[200px] truncate"
                      >
                        {youtubeUrl}
                      </Link>
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* basic Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <FaGenderless className="mr-3 h-5 w-5" /> Gender :{" "}
                    </span>
                    <p className="uppercase">{gender || 0}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <Languages className="mr-3 h-5 w-5" /> Languages :{" "}
                    </span>
                    <span className="flex">
                      {languages?.map((language, index) => (
                        <Button
                          variant="outline"
                          key={index}
                          className="ml-1 uppercase"
                        >
                          {language}
                        </Button>
                      ))}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <School className="mr-3 h-5 w-5" /> School :{" "}
                    </span>
                    <p className="uppercase">{schoolName}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <School className="mr-3 h-5 w-5" /> College :{" "}
                    </span>
                    <p className="uppercase">{collegeName}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <University className="mr-3 h-5 w-5" /> University :{" "}
                    </span>
                    <p className="uppercase">{universityName}</p>
                  </div>
                </CardContent>
              </Card>
              {/* Experience & skills */}
              <Card  className="md:col-span-2" >
                <CardHeader>
                  <CardTitle className="text-lg">Basic Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <OrigamiIcon className="mr-3 h-5 w-5" /> Organisation :{" "}
                    </span>
                    <p className="uppercase">{organisation}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <AtomIcon className="mr-3 h-5 w-5" /> Domain :{" "}
                    </span>
                    <p className="uppercase">{domain}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <Workflow className="mr-3 h-5 w-5" /> Work Experience :{" "}
                    </span>
                    <p className="uppercase">{workExperience}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <SparkleIcon className="mr-3 h-5 w-5" /> Skills :{" "}
                    </span>
                    <span className="flex">
                      {skills?.map((skill, index) => (
                        <Button
                          variant="outline"
                          key={index}
                          className="ml-1 uppercase"
                        >
                          {skill}
                        </Button>
                      ))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold flex">
                      {" "}
                      <BookPlus className="mr-3 h-5 w-5" /> Topics :{" "}
                    </span>
                    <span className="flex">
                      {topics?.map((topic, index) => (
                        <Button
                          variant="outline"
                          key={index}
                          className="ml-1 uppercase"
                        >
                          {topic}
                        </Button>
                      ))}
                    </span>
                  </div>

                </CardContent>
              </Card>
              
              
            </div>

            <hr className="my-8" />
            <div className="flex justify-between">
            <Button variant="outline">Back</Button>

                {
                    status === "pending" && (  
                        <Button onClick={handleMakeMentor} variant="outline" className="bg-green-600 hover:bg-green-700">Make Mentor</Button>
                    )
                }
                {
                    status === "accepted" && (  
                        <Button variant="outline" className="bg-red-600 hover:bg-red-700">Remove Mentor</Button>
                    )
                }

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorCandidateProfile;
