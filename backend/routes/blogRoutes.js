const express = require("express");

const {
    createBlog
} = require("../controllers/blogController");

const router = express.Router();

// Create Blog
router.post("/", createBlog);

module.exports = router;