const { ObjectId } = require('mongodb');
let rewardsCollection;
const init = db => {
  rewardsCollection = db.collection('gifts');
};

const getAllRewards = async (req, res) => {
  try {
    const rewards = await rewardsCollection.find().toArray();
    if (rewards.length === 0) {
      return res.status(404).json({ error: 'No rewards found' });
    }
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
};

module.exports = { init, getAllRewards };
