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
const getStudentsRank = async (req, res) => {
  try {
    const users = await usersCollection
      .find({ role: 'student' })
      .sort({ points: -1 })
      .toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getAuser = async (req, res) => {
  const { email } = req.params;
  const query = { email };
  const result = await usersCollection.findOne(query);
  res.send(result);
};

const postAuser = async (req, res) => {
  try {
    const user = req.body;
    const query = { email: user.email };
    const exist = await usersCollection.findOne(query);
    if (exist) {
      return res.send({ message: 'user already exists', insertId: null });
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert user' });
  }
};

const updateAuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const { _id, ...userDataToUpdate } = updatedUser;

    // Try to update the user in the database
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: userDataToUpdate },
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: 'User not found or no changes made' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    res
      .status(500)
      .json({ error: 'Failed to update user', message: error.message });
  }
};

const updateUserWithParticipation = async (req, res) => {
  try {
    const { email } = req.params;
    const opportunityId = req.body.opportunityId;
    if (!email || !opportunityId) {
      return res
        .status(400)
        .json({ error: 'User email and opportunity ID are required' });
    }

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.participations) {
      user.participations = [];
    }

    // Check if the opportunity ID is already in the participants array
    if (!user.participations.includes(opportunityId)) {
      user.participations.push(opportunityId); // Add opportunity ID to participants
    }

    // Update the user document with the new participants array
    const result = await usersCollection.updateOne(
      { email },
      { $set: { participations: user.participations } },
    );

    res.json(result);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to update user with participation' });
  }
};

const deleteAuser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate userId as a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const result = await usersCollection.deleteOne({
      _id: new ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  init,
  getUsers,
  postAuser,
  updateAuser,
  deleteAuser,
  getAuser,
  updateUserWithParticipation,
  getStudentsRank,
};
