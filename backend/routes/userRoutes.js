const express = require("express");

const {
    getUserProfile,
    updateProfile,
    changePassword,
    deleteAccount
} = require("../controllers/userController");

const router = express.Router();


// Get profile
router.get("/:id", getUserProfile);


// Update profile
router.put("/:id", updateProfile);


// Change password
router.put("/:id/password", changePassword);


// Delete account
router.delete("/:id", deleteAccount);


module.exports = router;