import BookingCard from "@/components/DashboardMentor/BookingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUserInfo from "@/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import MentorBookingTable from "@/components/DashboardMentor/MentorBookingTable";
const MyBookings = () => {

  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const { data: bookings = [], isLoading, refetch} = useQuery({
    queryKey: ["bookings", userInfo.mentorID],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mentor-bookings/${userInfo.mentorID}`);
      return data;
    },
  });

  const { data: upComing = [], isLoading: isLoadingUpcoming, refetch: refetchUpcoming } = useQuery({ 
    queryKey: ["upComing", userInfo.mentorID],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/upcoming-bookings/${userInfo.mentorID}`);
      return data;
    },
  });

  if (isLoading || isLoadingUpcoming) return <p className="text-center">Loading mentors...</p>; 
  console.log(userInfo);

  return (
    <div className="p-4">
      <MentorDashboardTitle title="My Bookings" />
      <hr className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BookingCard number={bookings.length} title="Total Bookings" textColor="green" />
        <BookingCard number={upComing.count} title="Upcoming Sessions" textColor="yellow" />
        <BookingCard number="3" title="Pending Payments" textColor="red" />
      </div>

      <hr className="my-8" />

      <Tabs defaultValue="tab1" className="w-full   ">
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg">
          <TabsList className="flex gap-2 bg-black text-white">
            <TabsTrigger value="tab1">1:1 Sessions</TabsTrigger>
            <TabsTrigger value="tab2">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="tab3">Queries</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>

        {/* Tab Contents */}
        <TabsContent value="tab1">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">1:1 Sessions</h3>
            <MentorBookingTable bookings={bookings} role= "mentor" refetch={refetch} refetch2={refetchUpcoming}/>
          </div>
        </TabsContent>

        <TabsContent value="tab2">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            <MentorBookingTable bookings={upComing.bookings} role= "mentor" refetch={refetchUpcoming} refetch2={refetch}/>
          </div>
        </TabsContent>

        <TabsContent value="tab3">
          <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Queries</h3>
            <p className="text-gray-600">Queries</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBookings;
