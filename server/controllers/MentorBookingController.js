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
        return res.status(400).json({ error: "This time slot is already booked." });
      }
  
      // Prepare booking data with a created timestamp
      const bookingData = {
        mentorId,
        userId,
        start: newStart,
        end: newEnd,
        title,
        createdAt: new Date(),
      };
  
      const result = await mentorBookingCollection.insertOne(bookingData);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error inserting mentor booking:", error);
      res.status(500).json({ error: "Failed to insert mentor booking" });
    }
  };
  

module.exports = {
  init,
  postMentorBooking,
  
};
