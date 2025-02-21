import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";
import BookingCalendar from "@/components/MentorBooking/BookingCalendar";
import Loader from "@/components/shared/Loader";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUserInfo from "@/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";

const MentorAvailability = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const {
    data: bookings = [],
    isLoading,
    
  } = useQuery({
    queryKey: ["bookings", userInfo.mentorID],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/mentor-bookings/${userInfo.mentorID}`
      );
      return data;
    },
  });

  if (isLoading) return <Loader/>;

  return (
    <div className="p-4">
      <MentorDashboardTitle title="Availability" />

      <hr className="my-8" />

      <BookingCalendar bookedSlots={bookings} />
    </div>
  );
};

export default MentorAvailability;
