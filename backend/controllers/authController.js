const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =============================
// REGISTER USER
// =============================

const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Validate required fields
        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required"
            });

        }


        // Validate email format
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;


        if (
            !emailRegex.test(email)
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please provide a valid email address"
            });

        }


        // Check if user already exists
        const existingUser =
            await User.findOne({
                email:
                    email.toLowerCase()
            });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    "User with this email already exists"
            });

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // Create user in MongoDB
        const newUser =
            await User.create({

                name,

                email:
                    email.toLowerCase(),

                password:
                    hashedPassword

            });


        return res.status(201).json({

            success: true,

            message:
                "User registered successfully",

            user: {

                id:
                    newUser._id,

                name:
                    newUser.name,

                email:
                    newUser.email

            }

        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};


// =============================
// LOGIN USER
// =============================

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Validate required fields
        if (
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required"
            });

        }


        // Find user in MongoDB
        const user =
            await User.findOne({

                email:
                    email.toLowerCase()

            });


        if (!user) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password"
            });

        }


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password"
            });

        }


        // =============================
        // CREATE JWT TOKEN
        // =============================

        const token =
            jwt.sign(

                {
                    id:
                        user._id.toString(),

                    name:
                        user.name,

                    email:
                        user.email

                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "7d"
                }

            );


        // =============================
        // LOGIN RESPONSE
        // =============================

        return res.status(200).json({

            success: true,

            message:
                "Login successful",

            token:

                token,

            user: {

                id:
                    user._id,

                name:
                    user.name,

                email:
                    user.email

            }

        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

// =============================
// GET CURRENT LOGGED-IN USER
// =============================

const getCurrentUser = async (req, res) => {

    try {

        // User ID comes from verified JWT
        const userId = req.user.id;

        const user =
            await User.findById(userId)
                .select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        return res.status(200).json({

            success: true,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio || "",
                createdAt: user.createdAt
            }

        });

    } catch (error) {

        console.error(
            "Get current user error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};