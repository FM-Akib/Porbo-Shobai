const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.qvgg1my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("doctorTicketDB");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1); // Exit on failure
  }
};

module.exports = { connectDB, client };
