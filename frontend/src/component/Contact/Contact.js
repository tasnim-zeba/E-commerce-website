import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllAdmins } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import "./Contact.css";


const Contact = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { admins, loading, error } = useSelector(
        (state) => state.allAdmins
    );

    const messageAdminHandler = (adminId) => {

        // Temporary
        navigate(`/chat/${adminId}`);

    };
    useEffect(() => {
        dispatch(getAllAdmins());
    }, [dispatch]);
  return (
    <div className="contactContainer">
      <div className="contactHeader">
        <h1>Contact Us</h1>
        <p>We're always here to help you.</p>
      </div>

      <div className="contactInfo">
        <div className="infoCard">
          <span className="icon">📧</span>
          <div>
            <h3>Email</h3>
            <p>support@shop.com</p>
          </div>
        </div>

        <div className="infoCard">
          <span className="icon">📞</span>
          <div>
            <h3>Phone</h3>
            <p>+880-1XXXXXXXXX</p>
          </div>
        </div>
      </div>

      <h2 className="teamTitle">Our Support Team</h2>

      <div className="adminGrid">
        {admins &&
            admins.map((admin) => (
            <div className="adminCard" key={admin._id}>
                <div className="avatar">
                {admin.avatar?.url ? (
                    <img
                    src={admin.avatar.url}
                    alt={admin.name}
                    className="adminAvatarImg"
                    />
                ) : (
                    "👤"
                )}
                </div>

                <h3>{admin.name}</h3>

                <p>{admin.email}</p>

                <button
                className="messageBtn"
                onClick={() => messageAdminHandler(admin._id)}
                >
                Message
                </button>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Contact;