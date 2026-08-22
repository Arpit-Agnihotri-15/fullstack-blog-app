const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // =============================
        // CHECK JWT SECRET
        // =============================

        if (!process.env.JWT_SECRET) {

            console.error(
                "JWT_SECRET is not configured"
            );

            return res.status(500).json({
                success: false,
                message: "Authentication configuration error"
            });

        }


        // =============================
        // GET AUTHORIZATION HEADER
        // =============================

        const authHeader =
            req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });

        }


        // =============================
        // CHECK BEARER FORMAT
        // =============================

        const [scheme, token] =
            authHeader.split(" ");


        if (
            scheme !== "Bearer" ||
            !token
        ) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid authentication format. Use Bearer token."
            });

        }


        // =============================
        // VERIFY TOKEN
        // =============================

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        // =============================
        // STORE USER IN REQUEST
        // =============================

        req.user = decoded;


        next();

    } catch (error) {

        console.error(
            "Authentication error:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};


module.exports =
    authMiddleware;