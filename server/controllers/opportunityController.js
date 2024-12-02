const { ObjectId } = require("mongodb");
let opportunityCollection;
const init = (db) => {
  opportunityCollection = db.collection("opportunities");
};

// const getAllOpportunities = async (req, res) => {
//   try {
//     const opportunities = await opportunityCollection.find().toArray();
//     if (opportunities.length === 0) {
//       return res.status(404).json({ error: "No opportunities found" });
//     }
//     res.json(opportunities);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch opportunities" }); 
//   }
// };
const getAllOpportunities = async (req, res) => {
  try {
    const { opportunityType, category, eventType, status, eligibility, page = 1, limit = 10 } = req.query;

    const query = {};

    if (opportunityType) query.opportunityType = opportunityType;
    if (category) query.categories = { $regex: category, $options: "i" };
    if (eventType) query.mode = eventType;
    if (status) query.status = status;
    if (eligibility) query.eligibility = eligibility;

    const skip = (page - 1) * limit;
    const total = await opportunityCollection.countDocuments(query);
    const opportunities = await opportunityCollection
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    res.json({ opportunities, total, page: parseInt(page), totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
};

const getAopportunity = async (req, res) => {
    const  id  = req.params.id; 
    const query = { _id: new ObjectId (id) }; 
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


module.exports = { init,getAllOpportunities, getAopportunity, postAopportunity, updateAopportunity, deleteAopportunity };
