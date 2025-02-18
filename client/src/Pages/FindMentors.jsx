import MentorRequestCard from "@/components/DashboardAdmin/MentorRequestCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const FindMentors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: mentors = [], isLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/verified-mentors");
      return data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading mentors...</p>;
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {mentors.map((mentor) => (
          <MentorRequestCard
            key={mentor._id}
            mentor={mentor}
            path={"/view-mentor-profile"}
          />
        ))}
      </div>
      
    </div>
  );
};

export default FindMentors;
