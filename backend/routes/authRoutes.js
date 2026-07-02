const express = require("express");
console.log("✅ authRoutes loaded");
const router = express.Router();

const {
    signup
} = require("../controllers/authController");

router.post("/signup", signup);

module.exports = router;