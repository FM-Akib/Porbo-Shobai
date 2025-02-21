const { ObjectId } = require('mongodb');
let usersCollection;

// Initialize the usersCollection from the database
const init = db => {
  usersCollection = db.collection('users');
};

const getUsers = async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  init,
  getUsers,
};
