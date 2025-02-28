import MentorProfile from "@/components/DashboardAdmin/MentorProfile";
import { HyperText } from "@/components/magicui/hyper-text";
import BookingCalendar from "@/components/MentorBooking/BookingCalendar";
import DateTimePicker from "@/components/MentorBooking/DateTimePicker";
import Loader from "@/components/shared/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/Hooks/use-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUserInfo from "@/hooks/useUserInfo";
import { ToastAction } from "@radix-ui/react-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ViewMentor = () => {
  const params = useParams();
  const { userInfo } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { toast } = useToast();

  const { data: mentor = [], isLoading } = useQuery({
    queryKey: ["mentor"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mentors/${params.id}`);

      return data;
    },
  });

  const {
    data: bookings = [],
    isLoading: isLoadingBookings,
    refetch,
  } = useQuery({
    queryKey: ["bookings", params.id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mentor-bookings/${params.id}`);
      return data;
    },
  });

  const handleDateTimeSubmit = (date, timeStart, timeEnd) => {
    setSelectedDate(date);
    setStartTime(timeStart);
    setEndTime(timeEnd);
    axiosSecure
      .post("/mentor-bookings", {
        mentorId: params.id,
        userId: userInfo._id,
        start: date + "T" + timeStart,
        end: date + "T" + timeEnd,
        title: "Booked",
      })
      .then((res) => {
        refetch();
        toast({
          title: "Successfully Booked.",
          description:
            "You have successfully booked a session with this mentor.",
          action: <ToastAction altText="Try again">OK!</ToastAction>,
          className: "bg-green-500 text-white",
        });
        console.log(res);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "Please try again.",
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        });
        console.log(err);
      });

    console.log(date + "T" + timeStart);
    console.log(date + "T" + timeEnd);
  };

  if (isLoading || isLoadingBookings) {
    return <Loader/>;
  }

  return (
    <div>
      <div>
        <MentorProfile mentor={mentor} />
        <div className="mt-4 p-4">
          <Card className="p-8">
            <div className="mb-8 text-center">
              <HyperText duration={2000}>Book a session!</HyperText>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContent>
                {/* input form */}
                <DateTimePicker onSubmit={handleDateTimeSubmit} />
                {selectedDate && startTime && endTime && (
                  <Card className="p-4 w-full max-w-sm shadow-lg border rounded-lg mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-left text-gray-700">
                      📅 <span className="font-medium">Selected Date:</span> <b>{selectedDate}</b> <br />
                      ⏰ <span className="font-medium">Start Time:</span> <b>{startTime}</b> <br />
                      ⏳ <span className="font-medium">End Time:</span> <b>{endTime}</b>
                    </p>
                  </CardContent>
                </Card>
                )}
              </CardContent>
              <CardContent>
                <BookingCalendar bookedSlots={bookings} />
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewMentor;
