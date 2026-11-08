import notesModel from "../Models/notesModel.js";

export const getMyNotes = async (req, res) => {
    try {
        const notes = await notesModel.find({
            user: req.userId
        })
        .select("topic classLevel examType revisionMode includeDiagram includeChart createdAt")
        .sort({ createdAt: -1 });

        return res.status(200).json(notes);

    } catch (error) {
        console.error("Get my notes error:", error);

        return res.status(500).json({
            message: "Unable to fetch notes"
        });
    }
};


export const getSingleNotes = async (req, res) => {
    try {
        const notes = await notesModel.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!notes) {
            return res.status(404).json({
                error: "Note not found"
            });
        }

        return res.status(200).json({
            content: notes.content,
            topic: notes.topic,
            createdAt: notes.createdAt
        });

    } catch (error) {
        console.error("Get single notes error:", error);

        return res.status(500).json({
            message: "Unable to fetch note"
        });
    }
};