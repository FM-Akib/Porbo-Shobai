import MentorProfile from "@/components/DashboardAdmin/MentorProfile";
import { HyperText } from "@/components/magicui/hyper-text";
import BookingCalendar from "@/components/MentorBooking/BookingCalendar";
import DateTimePicker from "@/components/MentorBooking/DateTimePicker";
import { Card, CardContent } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUserInfo from "@/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ViewMentor = () => {
  const params = useParams();
  const {userInfo} = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [bookedSlots, setBookedSlots] = useState([
    {
      start: new Date("2025-02-02T09:00"),
      end: new Date("2025-02-02T10:00"),
      title: "Booked",
    },
  ]);

  const { data: mentor = [], isLoading } = useQuery({
    queryKey: ["mentor"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mentors/${params.id}`);

      return data;
    },
  });

  const handleDateTimeSubmit = (date, timeStart, timeEnd) => {
    setSelectedDate(date);
    setStartTime(timeStart);
    setEndTime(timeEnd);

    const newSlot = {
      start: new Date(date + "T" + timeStart),
      end: new Date(date + "T" + timeEnd),
      title: "Booked",
    };
    setBookedSlots([...bookedSlots, newSlot]);
    axiosSecure
      .post("/mentor-bookings", {
        mentorId: params.id,
        userId: userInfo._id,
        start: date + "T" + timeStart,
        end: date + "T" + timeEnd,
        title:"Booked",
      })
      .then((res) => {
        console.log(res);
      });

    console.log(date + "T" + timeStart);
    console.log(date + "T" + timeEnd);
  };

  if (isLoading) {
    return <p className="text-center">Loading mentors...</p>;
  }

  return (
    <div>
      <div>
        <MentorProfile mentor={mentor} />
        <div className="mt-4 p-4">
          <Card className="p-8">
            <div className="mb-4 text-center">
              <HyperText duration={2000}>Book a session!</HyperText>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContent>
                {/* input form */}
                <DateTimePicker onSubmit={handleDateTimeSubmit} />
                {selectedDate && startTime && endTime && (
                  <p className="text-center">
                    📅 Selected Date: <b>{selectedDate}</b> <br />⏰ Start Time:{" "}
                    <b>{startTime}</b> <br />⏳ End Time: <b>{endTime}</b>
                  </p>
                )}
              </CardContent>
              <CardContent>
                <BookingCalendar bookedSlots={bookedSlots} />
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewMentor;
