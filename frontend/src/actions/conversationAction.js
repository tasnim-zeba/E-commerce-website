import axios from "axios";

import {
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAIL,
    GET_CONVERSATION_REQUEST,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_FAIL,
    
} from "../constants/conversationConstants";

export const createConversation = (adminId) => async (dispatch) => {

    try {

        dispatch({
            type: CREATE_CONVERSATION_REQUEST,
        });

        const { data } = await axios.post(
            "/api/v1/conversation",
            { adminId },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: CREATE_CONVERSATION_SUCCESS,
            payload: data.conversation,
        });

    } catch (error) {

        dispatch({
            type: CREATE_CONVERSATION_FAIL,
            payload: error.response.data.message,
        });

    }

};

// Get Conversation Details
export const getConversation = (id) => async (dispatch) => {

    try {

        dispatch({
            type: GET_CONVERSATION_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/conversation/${id}`);

        dispatch({
            type: GET_CONVERSATION_SUCCESS,
            payload: data.conversation,
        });

    } catch (error) {

        dispatch({
            type: GET_CONVERSATION_FAIL,
            payload: error.response.data.message,
        });

    }

};