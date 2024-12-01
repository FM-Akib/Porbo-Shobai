const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const { init: initUserController } = require("./controllers/userController");
const { init: initOpportunityController } = require("./controllers/opportunityController");
const router = require("./routes/routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB().then((db) => {
  // Initialize with database 
  initUserController(db);
  initOpportunityController(db);

  // Routes
  app.use("/", router);

  // Base route
  app.get("/", (req, res) => {
    res.send("PS Server is running!!");
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
