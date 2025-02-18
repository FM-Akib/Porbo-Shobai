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
        const mentors = await mentorCollection.find().sort({ _id: -1 }).toArray();
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

const updateAMentor = async (req, res) => {
    try {
        const mentorId = req.params.id;
        
        const result = await mentorCollection.updateOne(
            { _id: new ObjectId(mentorId) },
            { $set: {status: "accepted"} }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to update mentor" });
    }
}

const getVerifiedMentors = async (req, res) => {
    try {
        const { search, domain, sort } = req.query;

        let query = { status: "accepted" };

        // Apply search filter if provided
        if (search) {
            const searchTerms = search.trim().split(/\s+/); // Split by spaces

            if (searchTerms.length === 2) {
                // If user entered two words (First and Last name)
                query.$or = [
                    { $and: [{ firstName: { $regex: searchTerms[0], $options: "i" } }, { lastName: { $regex: searchTerms[1], $options: "i" } }] },
                    { $and: [{ firstName: { $regex: searchTerms[1], $options: "i" } }, { lastName: { $regex: searchTerms[0], $options: "i" } }] }
                ];
            } else {
                // If single-word search, check both firstName and lastName
                query.$or = [
                    { firstName: { $regex: search, $options: "i" } },
                    { lastName: { $regex: search, $options: "i" } }
                ];
            }
        }

        // Apply domain filter if provided
        if (domain) {
            query.domain = domain;
        }

        // Define sorting option
        let sortOption = {};
        if (sort === "asc") {
            sortOption.rating = 1; // Lowest to highest
        } else if (sort === "desc") {
            sortOption.rating = -1; // Highest to lowest
        }

        // Fetch mentors with applied filters & sorting
        const mentors = await mentorCollection.find(query).sort(sortOption).toArray();

        res.json(mentors);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch mentors" });
    }
};
module.exports = { init, postAMentor, getAllMentors, getAMentor, updateAMentor, getVerifiedMentors };