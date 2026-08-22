const authMiddleware =
    require("../middleware/authMiddleware");

const express = require("express");

const {
    createBlog,
    getAllBlogs,
    getBlogById,
    likeBlog,
    incrementViews,
    updateBlog,
    deleteBlog,
    getFeaturedBlogs,
    getMyBlogs
} = require("../controllers/blogController");

const router = express.Router();


router.post(
    "/",
    authMiddleware,
    createBlog
);

router.get(
    "/my",
    authMiddleware,
    getMyBlogs
);

router.put(
    "/:id",
    authMiddleware,
    updateBlog
);

router.delete(
    "/:id",
    authMiddleware,
    deleteBlog
);

// Get all blogs
router.get("/", getAllBlogs);

// Get featured blogs
router.get("/featured", getFeaturedBlogs);

// Get single blog
router.get("/:id", getBlogById);

// Like Blog
router.post("/:id/like", likeBlog);

// Increment Blog Views
router.post("/:id/view", incrementViews);

module.exports = router;