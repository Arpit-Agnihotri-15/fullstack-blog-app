const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

// =============================
// CREATE BLOG
// =============================

const createBlog = async (req, res) => {
    try {

        const {
            title,
            category,
            image,
            description,
            content,
            tags,
            author,
            authorId
        } = req.body;


        // Validate required fields
        if (
            !title ||
            !category ||
            !description ||
            !content ||
            !author ||
            !authorId
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, category, description, content, author and authorId are required"
            });
        }


        // Process tags
        let processedTags = [];


        if (Array.isArray(tags)) {

            processedTags =
                tags
                    .map(tag => String(tag).trim())
                    .filter(tag => tag !== "");

        } else if (typeof tags === "string") {

            processedTags =
                tags
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag !== "");

        }


        // Create blog
        const newBlog =
            await Blog.create({

                title:
                    title.trim(),

                category:
                    category.trim(),

                image:
                    image && image.trim()
                        ? image.trim()
                        : "https://placehold.co/900x400?text=Scriptora",

                description:
                    description.trim(),

                content:
                    content.trim(),

                tags:
                    processedTags,

                author:
                    author.trim(),

                authorId

            });


        return res.status(201).json({

            success: true,

            message:
                "Blog created successfully",

            blog:
                newBlog

        });


    } catch (error) {

        console.error(
            "Create blog error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }
};


// =============================
// GET ALL BLOGS
// =============================

const getAllBlogs = async (req, res) => {

    try {

        const blogs =
            await Blog
                .find()
                .sort({
                    createdAt: -1
                });


        return res.status(200).json({

            success: true,

            count:
                blogs.length,

            blogs

        });


    } catch (error) {

        console.error(
            "Get all blogs error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

};


// =============================
// GET SINGLE BLOG
// =============================

const getBlogById = async (req, res) => {

    try {

        const blog =
            await Blog.findById(
                req.params.id
            );


        if (!blog) {

            return res.status(404).json({

                success: false,

                message:
                    "Blog not found"

            });

        }


        return res.status(200).json({

            success: true,

            blog

        });


    } catch (error) {

        console.error(
            "Get blog error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

};


// =============================
// LIKE BLOG
// =============================

const likeBlog = async (req, res) => {

    try {

        const blog =
            await Blog.findByIdAndUpdate(

                req.params.id,

                {
                    $inc: {
                        likes: 1
                    }
                },

                {
                    new: true
                }

            );


        if (!blog) {

            return res.status(404).json({

                success: false,

                message:
                    "Blog not found"

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Blog liked successfully",

            likes:
                blog.likes

        });


    } catch (error) {

        console.error(
            "Like blog error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

};


// =============================
// INCREMENT BLOG VIEWS
// =============================

const incrementViews = async (req, res) => {

    try {

        const blog =
            await Blog.findByIdAndUpdate(

                req.params.id,

                {
                    $inc: {
                        views: 1
                    }
                },

                {
                    new: true
                }

            );


        if (!blog) {

            return res.status(404).json({

                success: false,

                message:
                    "Blog not found"

            });

        }


        return res.status(200).json({

            success: true,

            message:
                "View count updated",

            views:
                blog.views

        });


    } catch (error) {

        console.error(
            "Increment views error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

};


// =============================
// UPDATE BLOG
// =============================

const updateBlog = async (req, res) => {

    try {

        // Find the blog first
        const blog =
            await Blog.findById(
                req.params.id
            );


        // Blog doesn't exist
        if (!blog) {

            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });

        }


        // =============================
        // OWNERSHIP CHECK
        // =============================

        if (
            blog.authorId.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to update this blog"
            });

        }


        // =============================
        // UPDATE BLOG
        // =============================

        const updatedBlog =
            await Blog.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );


        return res.status(200).json({

            success: true,

            message:
                "Blog updated successfully",

            blog:
                updatedBlog

        });

    } catch (error) {

        console.error(
            "Update blog error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

// =============================
// DELETE BLOG
// =============================

const deleteBlog = async (req, res) => {

    try {

        // Find the blog first
        const blog =
            await Blog.findById(
                req.params.id
            );


        // Blog doesn't exist
        if (!blog) {

            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });

        }


        // =============================
        // OWNERSHIP CHECK
        // =============================

        if (
            blog.authorId.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to delete this blog"
            });

        }


        // =============================
        // DELETE BLOG
        // =============================

        await Blog.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({
            success: true,
            message:
                "Blog deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete blog error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

// =============================
// GET FEATURED BLOGS
// =============================

const getFeaturedBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find()
            .sort({
                likes: -1,
                views: -1,
                createdAt: -1
            })
            .limit(10);

        // Calculate comment count for each blog
        const featuredBlogs = await Promise.all(
            blogs.map(async (blog) => {

                const commentCount =
                    await Comment.countDocuments({
                        blogId: blog._id
                    });

                const featuredScore =
                    Number(blog.likes || 0) +
                    Number(blog.views || 0) +
                    commentCount;

                return {
                    ...blog.toObject(),
                    commentCount,
                    featuredScore
                };

            })
        );

        // Sort using actual engagement score
        featuredBlogs.sort(
            (a, b) =>
                b.featuredScore -
                a.featuredScore
        );

        // Only top 3
        const topBlogs =
            featuredBlogs.slice(0, 3);

        return res.status(200).json({
            success: true,
            count: topBlogs.length,
            blogs: topBlogs
        });

    } catch (error) {

        console.error(
            "Get featured blogs error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};


// =============================
// EXPORT CONTROLLERS
// =============================

module.exports = {

    createBlog,

    getAllBlogs,

    getBlogById,

    likeBlog,

    incrementViews,

    updateBlog,

    deleteBlog,

    getFeaturedBlogs

};