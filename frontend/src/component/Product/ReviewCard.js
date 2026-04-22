import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/profile.png";

function ReviewCard({review}) {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
     };
    return (
        <div className="reviewCard">
            
            <img src={profilePng} alt="User" />
            <span>by {review.name}</span>
            <ReactStars {...options} />
            <p>{review.comment}</p>

        </div>
    );
}
   
export default ReviewCard;