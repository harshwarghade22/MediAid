const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const emailRoutes = require("./routes/emailRoutes");
dotenv.config();
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"] 
}));
// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to MediAid Backend 🚑");
});

// API Routes
app.use("/api/auth", authRoutes);        // Authentication
app.use("/api/doctors", doctorRoutes);    // Doctor Profiles & Appointments
app.use("/api/pharmacies", pharmacyRoutes); // Pharmacy Listings & Emergency Services
app.use("/api", emailRoutes);
// Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: "API route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
