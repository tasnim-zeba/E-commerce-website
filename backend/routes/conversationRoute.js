const express = require("express");

const router = express.Router();

const {
    createOrGetConversation, getConversation
} = require("../controllers/conversationController");

const {
    isAuthenticatedUser,
} = require("../middleware/auth");

router
.route("/conversation")
.post(isAuthenticatedUser, createOrGetConversation);

router
.route("/conversation/:id")
.get(isAuthenticatedUser, getConversation);

module.exports = router;