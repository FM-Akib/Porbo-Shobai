import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { differenceInMinutes, format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import CreateMeetingLinkDialog from "./CreateMeetingLinkDialog";
const MentorBookingTable = ({ bookings, role, refetch, refetch2 }) => {
  const handleMeetingLinkSubmit = (meetingLink) => {
    // For now, just log it. Later you can call your backend API here.
    console.log("Submitted Meeting Link:", meetingLink);
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Meeting Link</TableHead>
            <TableHead className="text-right">View Student</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                {format(new Date(booking.start), "dd-MM-yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(booking.start), "hh:mm a")}
              </TableCell>
              <TableCell>{format(new Date(booking.end), "hh:mm a")}</TableCell>
              <TableCell>
                {differenceInMinutes(
                  new Date(booking.end),
                  new Date(booking.start)
                )}{" "}
                minutes
              </TableCell>
              <TableCell>
                {booking.meetingURL ? (
                  <Link to={booking.meetingURL} target="_blank"><Button className="bg-green-500">Join</Button></Link>
                ) : role === "mentor" ? (
                  <CreateMeetingLinkDialog onSubmit={handleMeetingLinkSubmit} refetch={refetch} refetch2={refetch2}  id={booking._id}/>
                ) : (
                  "Meeting Link Not Provided"
                )}
              </TableCell>
              <TableCell className="text-right">
                <Link>
                  <Button>View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MentorBookingTable;
