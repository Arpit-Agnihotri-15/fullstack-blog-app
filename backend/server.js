const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// =============================
// DATABASE
// =============================

connectDB();

// =============================
// MIDDLEWARE
// =============================

app.use(cors());
app.use(express.json());

// =============================
// ROUTES
// =============================

app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

// =============================
// ROOT ROUTE
// =============================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Blog App Backend is running!"
    });
});

// =============================
// 404 HANDLER
// =============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// =============================
// START SERVER
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



