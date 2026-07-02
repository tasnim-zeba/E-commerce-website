import axios from "axios";

import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
} from "../constants/messageConstants";


export const getMessages = (conversationId) => async (dispatch) => {

    try {

        dispatch({
            type: GET_MESSAGES_REQUEST,
        });

        const { data } = await axios.get(
            `/api/v1/messages/${conversationId}`
        );

        dispatch({
            type: GET_MESSAGES_SUCCESS,
            payload: data.messages,
        });

    } catch (error) {

        dispatch({
            type: GET_MESSAGES_FAIL,
            payload: error.response.data.message,
        });

    }

};

export const sendMessage = (messageData) => async (dispatch) => {

    try {

        dispatch({
            type: SEND_MESSAGE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/message",
            messageData,
            config
        );

        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: data.message,
        });

    } catch (error) {

        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error.response.data.message,
        });

    }

};