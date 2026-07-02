import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getConversation } from "../../actions/conversationAction";
import {
    getMessages,
    sendMessage,
} from "../../actions/messageAction";
import { SEND_MESSAGE_RESET } from "../../constants/messageConstants";
import { useRef } from "react";
import "./Chat.css";
import socket from "../../socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatBodyRef = useRef(null);
  const { conversationId } = useParams();

    const dispatch = useDispatch();

  
  const { messages } = useSelector(
    (state) => state.messages
    );

    const {
    success,
    // message: sentMessage,
} = useSelector((state) => state.newMessage);

    const { user } = useSelector(
        (state) => state.user
    );

    const {
        conversation,
    } = useSelector((state) => state.conversationDetails);
    
    const otherUser =
        conversation &&
        (user._id === conversation.admin?._id
            ? conversation.customer
            : conversation.admin);
  
  const sendMessageHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const receiverId =
    user._id === conversation.admin._id
        ? conversation.customer._id
        : conversation.admin._id;
    

    dispatch(
        sendMessage({
            conversationId,
            receiverId,
            message,
        })
    );

    setMessage("");
  };

    
    
    

    useEffect(() => {

        dispatch(getConversation(conversationId));
        dispatch(getMessages(conversationId));

    }, [dispatch, conversationId]);

    useEffect(() => {
    if (messages) {
        setChatMessages(messages);
    }
}, [messages]);

    

    useEffect(() => {

        if (chatBodyRef.current) {

            chatBodyRef.current.scrollTop =
                chatBodyRef.current.scrollHeight;

        }

    }, [chatMessages]);

    useEffect(() => {

        socket.on("receiveMessage", (newMessage) => {

            setChatMessages((prev) => [...prev, newMessage]);

        });

        return () => {

            socket.off("receiveMessage");

        };

    }, []);


    useEffect(() => {

      if (success) {

          dispatch({
              type: SEND_MESSAGE_RESET,
          });

      }

  }, [success, dispatch]);

  return (
    
    <div className="chatContainer">

      <div className="chatHeader">
            <div className="chatAvatar">
                {otherUser?.avatar?.url ? (
                    <img
                        src={otherUser.avatar.url}
                        alt={otherUser.name}
                        className="chatAvatarImg"
                    />
                ) : (
                    "👤"
                )}
            </div>

            <div>
                <h3>{otherUser?.name}</h3>
                <span>Online</span>
            </div>
      </div>

      <div className="chatBody" ref={chatBodyRef}>

        {chatMessages &&
            chatMessages.map((msg) => (

                <div
                    key={msg._id}
                    className={
                        msg.sender._id === user._id
                            ? "message userMessage"
                            : "message adminMessage"
                    }
                >
                    {msg.message}
                </div>

        ))}

      </div>

      <form className="chatFooter" onSubmit={sendMessageHandler}>

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">
          Send
        </button>

      </form>

    </div>
  );
};

export default Chat;