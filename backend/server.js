require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config.js/db");

const requestLogger = require("./middleware/requestLogger");
const authGuard = require("./middleware/authGuard");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Global request logger
app.use(requestLogger);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "QuickBite API is running"
    });
});

// Public routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);

// Protected routes
app.use(
    "/api/v1/orders",
    authGuard,
    orderRoutes
);

// Global error handler - must be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});