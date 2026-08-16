const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        content: {
            type: String,
            required: true
        },

        tags: {
            type: [String],
            default: []
        },

        // Display name of the author
        author: {
            type: String,
            required: true,
            trim: true
        },

        // Unique MongoDB ID of the user who created the blog
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        likes: {
            type: Number,
            default: 0
        },

        comments: {
            type: Number,
            default: 0
        },

        views: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Blog", blogSchema);