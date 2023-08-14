import express from "express";
import dotenv from "dotenv/config";

const app = express();

app.get("/", (req, res) => {
    return res.status(200).send("Welcome to MERN Stack Tutorial!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});