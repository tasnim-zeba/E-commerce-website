const express = require("express");

const router = express.Router();

const {
    getNotifications,
    deleteNotification,
} = require("../controllers/notificationController");

const {
    isAuthenticatedUser,
} = require("../middleware/auth");

router
    .route("/notifications")
    .get(isAuthenticatedUser, getNotifications);

router
    .route("/notification/:id")
    .delete(isAuthenticatedUser, deleteNotification);
    
module.exports = router;