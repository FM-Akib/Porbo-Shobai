import MentorBookingTable from "@/components/DashboardMentor/MentorBookingTable";
import TitleDashboard from "@/components/DashboardUser/TitleDashboard";
import Loader from "@/components/shared/Loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUserInfo from "@/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";

const StudentSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo, isLoading: userInfoLoading } = useUserInfo();
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", userInfo._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/student-bookings/${userInfo._id}`
      );
      return data;
    },
  });

  const { data: upComing = [], isLoading: isLoadingUpcoming, refetch: refetchUpcoming } = useQuery({ 
    queryKey: ["upComing", userInfo._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/student-upcoming-bookings/${userInfo._id}`);
      return data;
    },
  });

  if(isLoading || userInfoLoading || isLoadingUpcoming) return <Loader/>;
  return (
    <div>
      <TitleDashboard title="My Registrations" />
      <div className="p-4">
        <Tabs defaultValue="tab1" className="w-full   ">
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
            <TabsList className="flex gap-2 bg-black text-white">
              <TabsTrigger value="tab1">1:1 Sessions</TabsTrigger>
              <TabsTrigger value="tab2">Upcoming Sessions</TabsTrigger>
              
            </TabsList>
          </div>

          {/* Tab Contents */}
          <TabsContent value="tab1">
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">1:1 Sessions</h3>
              <MentorBookingTable
                bookings={bookings}
                role="student"
                refetch={refetch}
                refetch2={refetchUpcoming}
              />
            </div>
          </TabsContent>

          <TabsContent value="tab2">
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
              <MentorBookingTable
                bookings={upComing.bookings}
                role="student"
                refetch={refetchUpcoming}
                refetch2={refetch}
              />
            </div>
          </TabsContent>

          
        </Tabs>
      </div>
    </div>
  );
};

export default StudentSessions;
