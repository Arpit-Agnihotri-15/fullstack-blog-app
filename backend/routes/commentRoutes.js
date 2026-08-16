const express = require("express");

const {
    addComment,
    getComments
} = require("../controllers/commentController");

const router = express.Router();

// Add comment
router.post("/", addComment);

// Get comments for a blog
router.get("/:blogId", getComments);

module.exports = router;