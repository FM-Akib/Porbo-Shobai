const express = require('express');
const axios = require('axios');
require('dotenv').config();

const {
  getUsers,
  postAuser,
  updateAuser,
  deleteAuser,
  getAuser,
  updateUserWithParticipation,
  getStudentsRank,
  makeMentor,
} = require('../controllers/userController');
const {
  getAopportunity,
  postAopportunity,
  updateAopportunity,
  deleteAopportunity,
  getAllOpportunities,
  updateAopportunityWithparticipants,
  getOpportunitiesByIds,
} = require('../controllers/opportunityController');

const {
  postAMentor,
  getAllMentors,
  getAMentor,
  updateAMentor,
  getVerifiedMentors,
} = require('../controllers/mentorController');
const {
  postMentorBooking,
  getMentorBookings,
  getUpcomingBookings,
  patchBookingUrl,
} = require('../controllers/MentorBookingController');

const router = express.Router();
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//Chat Routes
router.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message.trim().toLowerCase();

    // Check for specific question like "Who are you?"
    if (
      userMessage === 'who are you?' ||
      userMessage === 'who are you' ||
      userMessage === 'who are you? '
    ) {
      return res.json({
        reply:
          'I am a teacher and also your brother from Porbo Shobai. You can ask me anything!',
      });
    }

    // Proceed with the regular AI response if the question is not "Who are you?"
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
        { inputs: userMessage },
        {
          headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
        },
      );

      res.json({ reply: response.data[0].generated_text });
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error processing AI response' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error processing request' });
  }
});

// USERS ROUTES
router.get('/users', getUsers);
router.get('/users/ranks', getStudentsRank);
router.get('/users/:email', getAuser);
router.post('/users', postAuser);
router.patch('/users/:id', updateAuser);
router.patch('/users/participation/:email', updateUserWithParticipation);
router.delete('/users/:id', deleteAuser);

// OPPORTUNITIES ROUTES
router.get('/opportunities', getAllOpportunities);
router.get('/opportunities/:id', getAopportunity);
router.get('/opportunitiesbyids', getOpportunitiesByIds);
router.post('/opportunities', postAopportunity);
router.patch('/opportunities/:id', updateAopportunity);
router.patch(
  '/opportunities/participants/:id',
  updateAopportunityWithparticipants,
);
router.delete('/opportunities/:id', deleteAopportunity);

// MENTOR ROUTE
router.post('/mentors', postAMentor);
router.get('/mentors', getAllMentors);
router.get('/mentors/:id', getAMentor);
router.patch('/mentors/:id', makeMentor);
router.patch('/mentor-status/:id', updateAMentor);
router.get('/verified-mentors', getVerifiedMentors);

//Mentor Bookings

router.post('/mentor-bookings', postMentorBooking);
router.get('/mentor-bookings/:mentorId', getMentorBookings),
  router.get('/upcoming-bookings/:mentorId', getUpcomingBookings);
router.patch('/meeting-link/:id', patchBookingUrl);

module.exports = router;
