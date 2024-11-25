const express = require("express");
const { getUsers, postAuser, updateAuser, deleteAuser, getAuser
 } = require("../controllers/userController");

const router = express.Router();

// Define routes for the user module
router.get("/", getUsers);
router.get("/:email", getAuser);
router.post("/", postAuser);
router.patch("/:id", updateAuser);
router.delete("/:id", deleteAuser);

module.exports = router;
