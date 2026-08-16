const Contact = require("../models/Contact");


// ========================================
// SEND CONTACT MESSAGE
// ========================================

const sendContactMessage = async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        // ================================
        // CLEAN INPUT
        // ================================

        const cleanName =
            String(name || "").trim();

        const cleanEmail =
            String(email || "")
                .trim()
                .toLowerCase();

        const cleanSubject =
            String(subject || "").trim();

        const cleanMessage =
            String(message || "").trim();


        // ================================
        // REQUIRED FIELDS
        // ================================

        if (
            !cleanName ||
            !cleanEmail ||
            !cleanSubject ||
            !cleanMessage
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "All contact form fields are required"
            });

        }


        // ================================
        // EMAIL VALIDATION
        // ================================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;


        if (!emailRegex.test(cleanEmail)) {

            return res.status(400).json({
                success: false,
                message:
                    "Please provide a valid email address"
            });

        }


        // ================================
        // LENGTH VALIDATION
        // ================================

        if (cleanName.length < 2) {

            return res.status(400).json({
                success: false,
                message:
                    "Name must contain at least 2 characters"
            });

        }


        if (cleanSubject.length < 3) {

            return res.status(400).json({
                success: false,
                message:
                    "Subject must contain at least 3 characters"
            });

        }


        if (cleanMessage.length < 10) {

            return res.status(400).json({
                success: false,
                message:
                    "Message must contain at least 10 characters"
            });

        }


        // ================================
        // SAVE MESSAGE
        // ================================

        const contact =
            await Contact.create({

                name:
                    cleanName,

                email:
                    cleanEmail,

                subject:
                    cleanSubject,

                message:
                    cleanMessage

            });


        // ================================
        // SUCCESS RESPONSE
        // ================================

        return res.status(201).json({

            success: true,

            message:
                "Message sent successfully",

            contact: {

                id:
                    contact._id,

                name:
                    contact.name,

                email:
                    contact.email,

                subject:
                    contact.subject,

                createdAt:
                    contact.createdAt

            }

        });

    } catch (error) {

        console.error(
            "Contact message error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


module.exports = {
    sendContactMessage
};