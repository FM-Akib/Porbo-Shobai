const { ObjectId } = require("mongodb");
let mentorCollection;
const init = (db) => {
    mentorCollection = db.collection("mentors");
};

const postAMentor = async (req, res) => {
    try {
        const mentor = req.body;
        const result = await mentorCollection.insertOne(mentor);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to insert mentor" });
    }
};

module.exports = { init, postAMentor };