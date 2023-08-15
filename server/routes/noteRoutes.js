import express from "express";
import Note from "../models/noteModel.js";

// express router allows us to create a modular, isolated instance of a router
const router = express.Router();

// Route to get all notes from database
router.get("/", async (req, res) => {
    try {
        const allNotes = await Note.find({});

        return res.json({
            count: allNotes.length,
            data: allNotes
        });
    } catch (err) {
        console.log(err);
    }
});

// Route to Get one note by id
router.get("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        return res.json(note);
    } catch (err) {
        console.log(err);
    }
});

// Route to save a new note
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({ title, content });

        return res.json(note);
    } catch (err) {
        console.log(err);
    }
});

// Route to Update a note
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await Note.findByIdAndUpdate(id, req.body);

        return res.json({ message: "Note updated successfully" });
    } catch (err) {
        console.log(err);
    }
});

// Route to Delete a note
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await Note.findByIdAndDelete(id);

        return res.json({ message: "Note deleted successfully" });
    } catch (err) {
        console.log(err);
    }
});

export default router;
