import express from "express";
import dotenv from "dotenv/config";
import mongoose from "mongoose";
import Note from "./models/noteModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to MERN Stack Tutorial!");
});

// Route to get all notes from database
app.get("/notes", async (req, res) => {
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
app.get("/notes/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        return res.json(note);
    } catch (err) {
        console.log(err);
    }
});

// Route to save a new note
app.post("/notes", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({ title, content });

        return res.json(note);
    } catch (err) {
        console.log(err);
    }
});

// Route to Update a note
app.patch("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await Note.findByIdAndUpdate(id, req.body);

        return res.json({ message: "Note updated successfully" });
    } catch (err) {
        console.log(err);
    }
});

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });