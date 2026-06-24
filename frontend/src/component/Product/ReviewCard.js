import React from 'react';
import { Rating } from "@mui/material";
import profilePng from "../../images/profile.png";

function ReviewCard({review}) {
    const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
    return (
        <div className="reviewCard">
            
            <img src={profilePng} alt="User" />
            <span>by {review.name}</span>
            <Rating {...options} />
            <p>{review.comment}</p>

        </div>
    );
}
   
export default ReviewCard;