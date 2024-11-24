const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const { init } = require("./controllers/userController");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB().then((db) => {
  // Initialize controllers with database collections
  init(db);

  // Routes
  app.use("/users", userRoutes);

  // Base route
  app.get("/", (req, res) => {
    res.send("Server is running!!");
  });



  // Start server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
