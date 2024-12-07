const express = require("express");
const { getUsers, postAuser, updateAuser, deleteAuser, getAuser
 } = require("../controllers/userController");
const {  getAopportunity, postAopportunity, updateAopportunity, deleteAopportunity, 
         getAllOpportunities, 
         updateAopportunityWithparticipants} = require("../controllers/opportunityController");

const router = express.Router();

// USERS ROUTES
router.get("/users", getUsers);
router.get("/users/:email", getAuser);
router.post("/users", postAuser);
router.patch("/users/:id", updateAuser);
router.delete("/users/:id", deleteAuser);

// OPPORTUNITIES ROUTES
router.get("/opportunities", getAllOpportunities);
router.get("/opportunities/:id", getAopportunity);
router.post("/opportunities", postAopportunity);
router.patch("/opportunities/:id", updateAopportunity);
router.patch("/opportunities/participants/:id", updateAopportunityWithparticipants);
router.delete("/opportunities/:id", deleteAopportunity);

module.exports = router;
