import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

import { deleteNotification  } from "../../../actions/notificationAction";

import "./Header.css";

const NotificationBell = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { notifications } = useSelector(
        (state) => state.notifications
    );

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = async (notification) => {

        try {

            await dispatch(deleteNotification(notification._id));

            handleClose();

            navigate(`/chat/${notification.conversation}`);

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <div className="notificationBell">

            <IconButton onClick={handleOpen}>

                <Badge
                    badgeContent={unreadCount}
                    color="error"
                >
                    <NotificationsIcon  className="notificationIcon" />
                </Badge>

            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >

                {notifications.length === 0 ? (

                    <MenuItem disabled>
                        No notifications
                    </MenuItem>

                ) : (

                    notifications.map((notification) => (

                        <div key={notification._id}>

                            <MenuItem
                                onClick={() =>
                                    handleNotificationClick(notification)
                                }
                            >

                                <div>

                                    <Typography
                                        variant="subtitle2"
                                    >
                                        {notification.sender.name}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                    >
                                        {notification.message}
                                    </Typography>

                                </div>

                            </MenuItem>

                            <Divider />

                        </div>

                    ))

                )}

            </Menu>

        </div>
    );
};

export default NotificationBell;