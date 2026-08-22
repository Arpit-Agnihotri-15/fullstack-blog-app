const express = require("express");

const {
    registerUser,
    loginUser,
    getCurrentUser
} = require("../controllers/authController");

const authMiddleware =
    require("../middleware/authMiddleware");

const router = express.Router();


// =============================
// REGISTER
// =============================

router.post(
    "/register",
    registerUser
);


// =============================
// LOGIN
// =============================

router.post(
    "/login",
    loginUser
);


// =============================
// CURRENT LOGGED-IN USER
// =============================

router.get(
    "/me",
    authMiddleware,
    getCurrentUser
);


module.exports = router;