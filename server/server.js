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

// Route to save a new note
app.post("/notes", async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.create({ title, content });

        return res.send(note);
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