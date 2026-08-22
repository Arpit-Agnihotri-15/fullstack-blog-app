const express = require("express");

const {
    getUserProfile,
    updateProfile,
    changePassword,
    deleteAccount
} = require("../controllers/userController");

const authMiddleware =
    require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// GET CURRENT USER PROFILE
// ========================================

router.get(
    "/me",
    authMiddleware,
    getUserProfile
);


// ========================================
// UPDATE CURRENT USER PROFILE
// ========================================

router.put(
    "/me",
    authMiddleware,
    updateProfile
);


// ========================================
// CHANGE CURRENT USER PASSWORD
// ========================================

router.put(
    "/me/password",
    authMiddleware,
    changePassword
);


// ========================================
// DELETE CURRENT USER ACCOUNT
// ========================================

router.delete(
    "/me",
    authMiddleware,
    deleteAccount
);


module.exports = router;