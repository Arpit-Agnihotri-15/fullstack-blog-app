const express = require("express");

const {
    sendContactMessage
} = require(
    "../controllers/contactController"
);

const router =
    express.Router();


// Send contact message
router.post(
    "/",
    sendContactMessage
);


module.exports = router;