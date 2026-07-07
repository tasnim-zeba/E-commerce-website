import axios from "axios";

import {
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAIL,

    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAIL,
} from "../constants/notificationConstants";


// Get all notifications
export const getNotifications = () => async (dispatch) => {

    try {

        dispatch({
            type: GET_NOTIFICATIONS_REQUEST,
        });

        const { data } = await axios.get("/api/v1/notifications");

        dispatch({
            type: GET_NOTIFICATIONS_SUCCESS,
            payload: data.notifications,
        });

    } catch (error) {

        dispatch({
            type: GET_NOTIFICATIONS_FAIL,
            payload: error.response.data.message,
        });

    }

};


export const deleteNotification = (notificationId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_NOTIFICATION_REQUEST,
        });

        const { data } = await axios.delete(
            `/api/v1/notification/${notificationId}`
        );

        dispatch({
            type: DELETE_NOTIFICATION_SUCCESS,
            payload: data.notificationId,
        });

        return data;

    } catch (error) {
        dispatch({
            type: DELETE_NOTIFICATION_FAIL,
            payload: error.response.data.message,
        });

        throw error;
    }
};