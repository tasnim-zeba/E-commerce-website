const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { getIO } = require("../socket");



// Send Message
exports.sendMessage = catchAsyncErrors(async (req, res, next) => {

    const { conversationId, receiverId, message } = req.body;

    if (!conversationId || !receiverId || !message) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        return next(new ErrorHandler("Conversation not found", 404));
    }

    // Check if logged-in user belongs to this conversation
    const userId = req.user.id;

    const isParticipant =
        conversation.customer.toString() === userId ||
        conversation.admin.toString() === userId;

    if (!isParticipant) {
        return next(new ErrorHandler("Unauthorized access", 403));
    }

    const newMessage = await Message.create({
        conversation: conversationId,
        sender: userId,
        receiver: receiverId,
        message,
    });

    // Update conversation
    conversation.lastMessage = message;
    conversation.lastMessageAt = Date.now();

    await conversation.save();

    await newMessage.populate("sender", "name avatar");
    await newMessage.populate("receiver", "name avatar");

    const io = getIO();

    // console.log("========== EMIT ==========");
    // console.log("Sender:", userId);
    // console.log("Receiver:", receiverId);

    io.to(receiverId).emit("receiveMessage", newMessage);
    io.to(userId).emit("receiveMessage", newMessage);

//     console.log("Event emitted");
// console.log("==========================");

    res.status(201).json({
        success: true,
        message: newMessage,
    });

});

// Get All Messages of a Conversation
exports.getMessages = catchAsyncErrors(async (req, res, next) => {

    const conversation = await Conversation.findById(req.params.conversationId);

    if (!conversation) {
        return next(new ErrorHandler("Conversation not found", 404));
    }

    const userId = req.user.id;

    const isParticipant =
        conversation.customer.toString() === userId ||
        conversation.admin.toString() === userId;

    if (!isParticipant) {
        return next(new ErrorHandler("Unauthorized access", 403));
    }

    const messages = await Message.find({
        conversation: req.params.conversationId,
    })
        .populate("sender", "name avatar")
        .populate("receiver", "name avatar")
        .sort({ createdAt: 1 });

    res.status(200).json({
        success: true,
        messages,
    });

});