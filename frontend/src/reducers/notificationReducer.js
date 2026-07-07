import {

    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAIL,

    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAIL,

    NEW_NOTIFICATION,
    CLEAR_ERRORS,

} from "../constants/notificationConstants";


export const notificationReducer = (
    state = { notifications: [] },
    action
) => {

    switch (action.type) {

        case GET_NOTIFICATIONS_REQUEST:

            return {
                ...state,
                loading: true,
            };


        case GET_NOTIFICATIONS_SUCCESS:

            return {
                loading: false,
                notifications: action.payload,
            };


        case NEW_NOTIFICATION:

            return {
                ...state,
                notifications: [
                    action.payload,
                    ...state.notifications,
                ],
            };



        case GET_NOTIFICATIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.filter(
                    (notification) =>
                        notification._id !== action.payload
                ),
            };

        case DELETE_NOTIFICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            };


        default:
            return state;

    }

};