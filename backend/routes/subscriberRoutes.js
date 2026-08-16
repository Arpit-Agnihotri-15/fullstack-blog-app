const express = require("express");

const {
    subscribe
} = require(
    "../controllers/subscriberController"
);

const router =
    express.Router();


// Subscribe to newsletter
router.post(
    "/",
    subscribe
);


module.exports = router;