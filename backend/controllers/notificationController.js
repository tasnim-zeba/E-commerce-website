const Notification = require("../models/notificationModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all notifications of logged-in user
exports.getNotifications = catchAsyncErrors(async (req, res, next) => {

    const notifications = await Notification.find({
        receiver: req.user.id,
    })
        .populate("sender", "name avatar")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        notifications,
    });

});

// Delete notification
exports.deleteNotification = catchAsyncErrors(async (req, res, next) => {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
    }

    // Security check
    if (notification.receiver.toString() !== req.user.id) {
        return next(new ErrorHandler("Unauthorized access", 403));
    }

    await notification.deleteOne();

    res.status(200).json({
        success: true,
        notificationId: req.params.id,
    });

});