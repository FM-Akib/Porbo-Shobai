const { ObjectId } = require("mongodb");
let usersCollection;

// Initialize the usersCollection from the database
const init = (db) => {
  usersCollection = db.collection("users");
};

const getUsers = async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" }); 
  }
};

const getAuser = async (req, res) => {
  const {email} = req.params;
  const query = {email}
  const result = await usersCollection.findOne(query);
  res.send(result);
}

const postAuser = async (req, res) => {
  try {
    const user = req.body;
    const query = {email: user.email}
    const exist = await usersCollection.findOne(query);
    if(exist){
      return res.send({message:'user already exists',insertId: null})
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to insert user" });
  }
};

const updateAuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatedUser }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteAuser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate userId as a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = { init, getUsers, postAuser, 
  updateAuser,deleteAuser, getAuser };
