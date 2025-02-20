const { ObjectId } = require("mongodb");
let mentorBookingCollection;
const init = (db) => {
  mentorBookingCollection = db.collection("mentorBookings");
};

const postMentorBooking = async (req, res) => {
  try {
    const { mentorId, userId, start, end, title } = req.body;

    // Convert time strings to Date objects
    const newStart = new Date(start); // e.g., "2025-02-02T09:00"
    const newEnd = new Date(end);

    // Check if an overlapping booking exists for the same mentor
    // Overlap condition: existing.start < newEnd AND existing.end > newStart
    const overlappingBooking = await mentorBookingCollection.findOne({
      mentorId,
      start: { $lt: newEnd },
      end: { $gt: newStart },
    });

    if (overlappingBooking) {
      return res
        .status(400)
        .json({ error: "This time slot is already booked." });
    }

    // Prepare booking data with a created timestamp
    const bookingData = {
      mentorId,
      userId,
      start: newStart,
      end: newEnd,
      title,
      createdAt: new Date(),
      meetingURL: "",
    };

    const result = await mentorBookingCollection.insertOne(bookingData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error inserting mentor booking:", error);
    res.status(500).json({ error: "Failed to insert mentor booking" });
  }
};

const getMentorBookings = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const bookings = await mentorBookingCollection
      .find({ mentorId: mentorId })
      .toArray();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching mentor bookings:", error);
    res.status(500).json({ error: "Failed to fetch mentor bookings" });
  }
};

const getUpcomingBookings = async (req, res) => {
  try {
    // Assuming mentorId is provided as a route parameter
    const { mentorId } = req.params;
    const currentTime = new Date();

    // Find bookings for the given mentor with start time >= current time
    const upcomingBookings = await mentorBookingCollection
      .find({
        mentorId,
        start: { $gte: currentTime },
      })
      .toArray();

    const count = upcomingBookings.length;

    res.status(200).json({ count, bookings: upcomingBookings });
  } catch (error) {
    console.error("Error fetching upcoming bookings:", error);
    res.status(500).json({ error: "Failed to fetch upcoming bookings" });
  }
};
module.exports = {
  init,
  postMentorBooking,
  getMentorBookings,
  getUpcomingBookings,
};
