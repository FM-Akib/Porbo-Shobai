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

const getAllMentors = async (req, res) => {
    try {
        const mentors = await mentorCollection.find().toArray();
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch mentors" });
    }
};

const getAMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await mentorCollection.findOne({ _id: new ObjectId(id) });
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch mentor" });
    }
};

module.exports = { init, postAMentor, getAllMentors, getAMentor };