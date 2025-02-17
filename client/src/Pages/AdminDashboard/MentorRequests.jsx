import MentorRequestCard from "@/components/DashboardAdmin/MentorRequestCard";
import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";


const MentorRequests = () => {
    
  return (
    <div className="p-4">
      <MentorDashboardTitle title="Mentor Requests" />
      <hr className="my-8" />
      <div>
        
        <MentorRequestCard/>

      </div>
    </div>
  );
};

export default MentorRequests;
