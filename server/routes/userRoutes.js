const express = require("express");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

// Define routes for the user module
router.get("/", getUsers);

module.exports = router;
