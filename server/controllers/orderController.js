const { ObjectId } = require('mongodb');
let orderCollection;
const init = db => {
  orderCollection = db.collection('orders');
};

const placeOrder = async (req, res) => {
  try {
    const order = req.body;
    const result = await orderCollection.insertOne(order);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

module.exports = { init, placeOrder };
