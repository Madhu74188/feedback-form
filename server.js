
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://feedback-form-umber-gamma.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Feedback Schema
const Feedback = mongoose.model("Feedback", {
    name: String,
    department: String,
    session: String,
    feedback: String,
    suggestions: String
});

// Test backend
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Submit feedback
app.post("/feedback", async (req, res) => {
    try {
        const savedFeedback = await Feedback.create(req.body);

        res.status(201).json({
            message: "Feedback submitted successfully!",
            data: savedFeedback
        });

    } catch (error) {
        console.log("Feedback Error:", error.message);

        res.status(500).json({
            message: "Failed to save feedback"
        });
    }
});

// Retrieve feedback
app.get("/feedback", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        res.status(200).json(feedbacks);

    } catch (error) {
        console.log("Retrieve Error:", error.message);

        res.status(500).json({
            message: "Failed to retrieve feedback"
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Atlas Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

startServer();
