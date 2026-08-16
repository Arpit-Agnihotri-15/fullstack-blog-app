const Comment = require("../models/Comment");

// =============================
// ADD COMMENT
// =============================

const addComment = async (req, res) => {
    try {
        const { blogId, name, text } = req.body;

        if (!blogId || !name || !text) {
            return res.status(400).json({
                success: false,
                message: "Blog ID, name and comment are required"
            });
        }

        const comment = await Comment.create({
            blogId,
            name: name.trim(),
            text: text.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error("Add comment error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =============================
// GET COMMENTS FOR BLOG
// =============================

const getComments = async (req, res) => {
    try {
        const comments = await Comment
            .find({ blogId: req.params.blogId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: comments.length,
            comments
        });

    } catch (error) {
        console.error("Get comments error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    addComment,
    getComments
};