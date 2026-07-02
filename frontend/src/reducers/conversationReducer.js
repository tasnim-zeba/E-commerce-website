import {
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAIL,
    CLEAR_ERRORS,
    GET_CONVERSATION_REQUEST,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_FAIL,
    CREATE_CONVERSATION_RESET
} from "../constants/conversationConstants";

export const conversationReducer = (
    state = { conversation: {} },
    action
) => {

    switch (action.type) {

        case CREATE_CONVERSATION_REQUEST:
            return {
                loading: true,
                conversation: {},
            };
        case CREATE_CONVERSATION_RESET:
            return {
                conversation: {},
            };

        case CREATE_CONVERSATION_SUCCESS:
            return {
                loading: false,
                conversation: action.payload,
            };

        case CREATE_CONVERSATION_FAIL:
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

export const conversationDetailsReducer = (
    state = { conversation: {} },
    action
) => {

    switch (action.type) {

        case GET_CONVERSATION_REQUEST:
            return {
                loading: true,
                conversation: {},
            };

        case GET_CONVERSATION_SUCCESS:
            return {
                loading: false,
                conversation: action.payload,
            };

        case GET_CONVERSATION_FAIL:
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