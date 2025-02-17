import MentorRequestCard from "@/components/DashboardAdmin/MentorRequestCard";
import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MentorRequests = () => {
  const axiosSecure = useAxiosSecure();

  
  const {
    data: mentors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/mentors");
      return data;
    },
  });

  if (isLoading) return <p className="text-center">Loading mentors...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to fetch mentors.</p>;

  return (
    <div className="p-4">
      <MentorDashboardTitle title="Mentor Requests" />
      <hr className="my-8" />
      <div>
        {
          mentors.map((mentor) => (
            <MentorRequestCard key={mentor._id} mentor={mentor} />
          ))
        }
        
      </div>
    </div>
  );
};

export default MentorRequests;
