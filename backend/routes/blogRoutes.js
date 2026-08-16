const express = require("express");

const {
    createBlog,
    getAllBlogs,
    getBlogById,
    likeBlog,
    incrementViews,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const router = express.Router();


// =============================
// CREATE BLOG
// =============================

router.post("/", createBlog);


// =============================
// GET ALL BLOGS
// =============================

router.get("/", getAllBlogs);


// =============================
// GET SINGLE BLOG
// =============================

router.get("/:id", getBlogById);


// =============================
// LIKE BLOG
// =============================

router.post("/:id/like", likeBlog);


// =============================
// INCREMENT BLOG VIEWS
// =============================

router.post("/:id/view", incrementViews);


// =============================
// UPDATE BLOG
// =============================

router.put("/:id", updateBlog);


// =============================
// DELETE BLOG
// =============================

router.delete("/:id", deleteBlog);


module.exports = router;