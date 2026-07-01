import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleAdmin } from "../../actions/userAction";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
 

  const messages = [
    {
      id: 1,
      sender: "admin",
      text: "Hello! How can I help you today?",
    },
    {
      id: 2,
      sender: "user",
      text: "I want to know the status of my order.",
    },
    {
      id: 3,
      sender: "admin",
      text: "Sure! Can you provide your Order ID?",
    },
  ];

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

    const { conversationId } = useParams();

    const dispatch = useDispatch();

    const { admin, loading } = useSelector(
        (state) => state.singleAdmin
    );

    useEffect(() => {

        dispatch(getSingleAdmin(conversationId));

    }, [dispatch, conversationId]);

  return (
    
    <div className="chatContainer">

      <div className="chatHeader">
            <div className="chatAvatar">
            {admin?.avatar?.url ? (
                <img
                    src={admin.avatar.url}
                    alt={admin.name}
                    className="adminAvatarImg"
                />
            ) : (
                "👤"
            )}
        </div>

        <div>
          <h3>{loading ? "Loading..." : admin?.name}</h3>
          <span>Online</span>
        </div>
      </div>

      <div className="chatBody">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === "user"
                ? "userMessage"
                : "adminMessage"
            }`}
          >
            {msg.text}
          </div>
        ))}

      </div>

      <form className="chatFooter" onSubmit={sendMessage}>

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