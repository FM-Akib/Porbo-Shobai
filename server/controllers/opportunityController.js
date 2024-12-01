const { ObjectId } = require("mongodb");

const init = (db) => {
  opportunityCollection = db.collection("opportunities");
};

const getOpportunities = async (req, res) => {
  try {
    const opportunities = await opportunityCollection.find().toArray();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch opportunities" }); 
  }
};

const getAopportunity = async (req, res) => {
    const { id } = req.params; 
    const query = { _id: id }; 
    const result = await opportunityCollection.findOne(query); 
    res.send(result); 
  }

const postAopportunity = async (req, res) => {
  try {
    const opportunity = req.body;
    const result = await opportunityCollection.insertOne(opportunity);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to insert opportunity" });
  }
};

const updateAopportunity = async (req, res) => {
    try {
      const opportunityId = req.params.id;
      const updatedOpportunity = req.body;
      const result = await opportunityCollection.updateOne(
        { _id: new ObjectId(opportunityId) },
        { $set: updatedOpportunity }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to update opportunity" });
    }
  };
  
const deleteAopportunity = async (req, res) => {
    try {
      const opportunityId = req.params.id;
  
      // Validate userId as a valid ObjectId
      if (!ObjectId.isValid(opportunityId)) {
        return res.status(400).json({ error: "Invalid opportunity ID format" });
      }
  
      const result = await opportunityCollection.deleteOne({ _id: new ObjectId(opportunityId) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Opportunity not found" });
      }
  
      res.json({ message: "opportunity deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete opportunity" });
    }
  };


module.exports = { init,getOpportunities, getAopportunity, postAopportunity, updateAopportunity, deleteAopportunity };
