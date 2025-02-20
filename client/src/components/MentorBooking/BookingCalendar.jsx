import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BookingCalendar = ({bookedSlots}) => {
  

  
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={bookedSlots}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        eventPropGetter={() => ({
          style: { backgroundColor: "red", color: "white" },
        })}
      />
    </div>
  );
};

export default BookingCalendar;
