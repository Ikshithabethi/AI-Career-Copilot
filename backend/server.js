const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/db");

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const app = express();

app.use(cors());
app.use(express.json());
console.log(authRoutes);
app.get("/", (req, res) => {
    res.send("AI Career Copilot Backend Running");
});
app.get("/api/dashboard", verifyToken, (req, res) => {

    res.json({
        message: "Welcome to AI Career Copilot Dashboard",
        user: req.user
    });

});
const PORT = process.env.PORT || 5001;
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});