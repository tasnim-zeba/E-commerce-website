const express = require("express");

const router = express.Router();

const {
    sendMessage,
    getMessages,
} = require("../controllers/messageController");

const {
    isAuthenticatedUser,
} = require("../middleware/auth");

router
    .route("/message")
    .post(isAuthenticatedUser, sendMessage);

router
    .route("/messages/:conversationId")
    .get(isAuthenticatedUser, getMessages);

module.exports = router;