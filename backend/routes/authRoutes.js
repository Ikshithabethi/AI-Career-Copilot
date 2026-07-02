const express = require("express");
console.log("✅ authRoutes loaded");
const router = express.Router();

const {
    signup,
    login
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login",login);

module.exports = router;