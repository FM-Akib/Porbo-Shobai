const express = require('express');
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
const { postMentorBooking, getMentorBookings } = require('../controllers/MentorBookingController');

const router = express.Router();

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
router.get('/mentors/:id', getAMentor );
router.patch('/mentors/:id',makeMentor );
router.patch('/mentor-status/:id', updateAMentor);
router.get('/verified-mentors', getVerifiedMentors);

//Mentor Bookings

router.post('/mentor-bookings', postMentorBooking );
router.get('/mentor-bookings/:mentorId', getMentorBookings)

module.exports = router;
