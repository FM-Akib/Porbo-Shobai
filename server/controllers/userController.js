const { ObjectId } = require("mongodb");
let usersCollection;

// Initialize the usersCollection from the database
const init = (db) => {
  usersCollection = db.collection("doctors");
};

const getUsers = async (req, res, next) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = { init, getUsers };
