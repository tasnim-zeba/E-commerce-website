import {

    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,

    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,

    SEND_MESSAGE_RESET,
    CLEAR_ERRORS,

} from "../constants/messageConstants";

export const messagesReducer = (
    state = { messages: [] },
    action
) => {

    switch (action.type) {

        case GET_MESSAGES_REQUEST:

            return {
                loading: true,
                messages: [],
            };

        case GET_MESSAGES_SUCCESS:

            return {
                loading: false,
                messages: action.payload,
            };

        case GET_MESSAGES_FAIL:

            return {
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

export const newMessageReducer = (
    state = {},
    action
) => {

    switch (action.type) {

        case SEND_MESSAGE_REQUEST:

            return {
                loading: true,
            };

        case SEND_MESSAGE_SUCCESS:

            return {
                loading: false,
                success: true,
                message: action.payload,
            };

        case SEND_MESSAGE_FAIL:

            return {
                loading: false,
                error: action.payload,
            };

        case SEND_MESSAGE_RESET:

            return {
                success: false,
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