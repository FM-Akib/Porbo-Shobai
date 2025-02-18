import MentorProfile from "@/components/DashboardAdmin/MentorProfile";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ViewMentor = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: mentor = [],
    isLoading,

  } = useQuery({
    queryKey: ["mentor"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mentors/${params.id}`);

      return data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading mentors...</p>;
  }
  
  return (
    <div>
      <div>
        <MentorProfile mentor={mentor} />
      </div>
    </div>
  );
};

export default ViewMentor;
