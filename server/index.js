import express from "express";
import dotenv from "dotenv/config";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to MERN Stack Tutorial!");
});

const PORT = process.env.PORT;

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