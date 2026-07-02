const Conversation = require("../models/Conversation");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create or Get Conversation
exports.createOrGetConversation = catchAsyncErrors(async (req, res, next) => {

    const selectedUserId = req.body.adminId;

    if (!selectedUserId) {
        return next(new ErrorHandler("User is required", 400));
    }

    let customer;
    let admin;

    if (req.user.role === "admin") {

        admin = req.user.id;
        customer = selectedUserId;

    } else {

        customer = req.user.id;
        admin = selectedUserId;

    }

    let conversation = await Conversation.findOne({
        customer,
        admin,
    });

    if (!conversation) {

        conversation = await Conversation.create({
            customer,
            admin,
        });

    }

    res.status(200).json({
        success: true,
        conversation,
    });

});

// Get Single Conversation
exports.getConversation = catchAsyncErrors(async (req, res, next) => {

    const conversation = await Conversation.findById(req.params.id)
        .populate("customer", "name email avatar")
        .populate("admin", "name email avatar");

    if (!conversation) {
        return next(new ErrorHandler("Conversation not found", 404));
    }

    // Check if the logged-in user is part of this conversation
    const userId = req.user.id;

    const isParticipant =
        conversation.customer._id.toString() === userId ||
        conversation.admin._id.toString() === userId;

    if (!isParticipant) {
        return next(new ErrorHandler("Unauthorized access", 403));
    }

    res.status(200).json({
        success: true,
        conversation,
    });

});