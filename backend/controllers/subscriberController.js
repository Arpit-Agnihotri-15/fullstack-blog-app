const Subscriber = require("../models/Subscriber");


// ========================================
// SUBSCRIBE TO NEWSLETTER
// ========================================

const subscribe = async (req, res) => {

    try {

        const email =
            String(
                req.body.email || ""
            )
            .trim()
            .toLowerCase();


        // Validate email
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;


        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required"
            });

        }


        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });

        }


        // Check duplicate
        const existingSubscriber =
            await Subscriber.findOne({
                email
            });


        if (existingSubscriber) {

            return res.status(409).json({
                success: false,
                message:
                    "This email is already subscribed"
            });

        }


        // Create subscriber
        const subscriber =
            await Subscriber.create({
                email
            });


        return res.status(201).json({

            success: true,

            message:
                "Subscribed successfully!",

            subscriber: {
                id: subscriber._id,
                email: subscriber.email,
                subscribedAt:
                    subscriber.createdAt
            }

        });

    } catch (error) {

        console.error(
            "Subscribe error:",
            error
        );


        // Handle duplicate key race condition
        if (error.code === 11000) {

            return res.status(409).json({
                success: false,
                message:
                    "This email is already subscribed"
            });

        }


        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


module.exports = {
    subscribe
};