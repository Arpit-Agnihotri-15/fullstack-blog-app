const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");


// ========================================
// GET USER PROFILE
// ========================================

const getUserProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });

        }

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // Find blogs belonging to this user
        const blogs = await Blog.find({
            authorId: user._id
        });


        const blogIds =
            blogs.map(blog => blog._id);


        // Count comments on user's blogs
        const totalComments =
            blogIds.length > 0
                ? await Comment.countDocuments({
                    blogId: {
                        $in: blogIds
                    }
                })
                : 0;


        // Calculate statistics
        const totalLikes =
            blogs.reduce(
                (sum, blog) =>
                    sum + (blog.likes || 0),
                0
            );


        const totalViews =
            blogs.reduce(
                (sum, blog) =>
                    sum + (blog.views || 0),
                0
            );


        return res.status(200).json({

            success: true,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio || "",
                createdAt: user.createdAt
            },

            stats: {
                blogs: blogs.length,
                likes: totalLikes,
                comments: totalComments,
                views: totalViews
            }

        });

    } catch (error) {

        console.error(
            "Get profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ========================================
// UPDATE PROFILE
// ========================================

const updateProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            name,
            email,
            bio
        } = req.body;


        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });

        }


        if (!name || !email) {

            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });

        }


        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;


        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });

        }


        // Check whether another account
        // already uses this email
        const existingUser =
            await User.findOne({
                email: email.toLowerCase(),
                _id: {
                    $ne: userId
                }
            });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });

        }


        const updatedUser =
            await User.findByIdAndUpdate(
                userId,
                {
                    name: name.trim(),
                    email: email.toLowerCase().trim(),
                    bio: (bio || "").trim()
                },
                {
                    new: true,
                    runValidators: true
                }
            )
            .select("-password");


        if (!updatedUser) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        return res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                bio: updatedUser.bio || "",
                createdAt: updatedUser.createdAt
            }

        });

    } catch (error) {

        console.error(
            "Update profile error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ========================================
// CHANGE PASSWORD
// ========================================

const changePassword = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            currentPassword,
            newPassword
        } = req.body;


        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });

        }


        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message:
                    "Current password and new password are required"
            });

        }


        if (newPassword.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "New password must be at least 6 characters"
            });

        }


        const user =
            await User.findById(userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        const passwordMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message:
                    "Current password is incorrect"
            });

        }


        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );


        user.password =
            hashedPassword;


        await user.save();


        return res.status(200).json({

            success: true,

            message:
                "Password updated successfully"

        });

    } catch (error) {

        console.error(
            "Change password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// ========================================
// DELETE ACCOUNT
// ========================================

const deleteAccount = async (req, res) => {

    try {

        const userId = req.user.id;


        if (!mongoose.Types.ObjectId.isValid(userId)) {

            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });

        }


        const user =
            await User.findById(userId);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // Find user's blogs
        const blogs =
            await Blog.find({
                authorId: user._id
            });


        const blogIds =
            blogs.map(blog => blog._id);


        // Delete comments belonging
        // to user's blogs
        if (blogIds.length > 0) {

            await Comment.deleteMany({
                blogId: {
                    $in: blogIds
                }
            });

        }


        // Delete user's blogs
        await Blog.deleteMany({
            authorId: user._id
        });


        // Delete user account
        await User.findByIdAndDelete(
            userId
        );


        return res.status(200).json({

            success: true,

            message:
                "Account and associated blogs deleted successfully"

        });

    } catch (error) {

        console.error(
            "Delete account error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


module.exports = {

    getUserProfile,
    updateProfile,
    changePassword,
    deleteAccount

};