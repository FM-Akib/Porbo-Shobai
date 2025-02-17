import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";



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

    if (isError) return <p className="text-center text-red-500">Failed to fetch mentors.</p>;

    return (
        <div className="p-4">
            <MentorDashboardTitle title="Candidate Profile" />
            <hr className="my-8" />

            this is candidate profile {mentor.firstName}
            
        </div>
    );
};

export default MentorCandidateProfile;
