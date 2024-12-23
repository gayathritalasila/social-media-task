import React, { useState } from "react";
import { FcLike } from "react-icons/fc";

const LikeButton = ({ likes, onLikeClick, postId, userId, likedBy }) => {
    const [liked, setLiked] = useState(likedBy.includes(userId));


    const handleClick = async () => {
        if (!liked) {
            setLiked(true); // Optimistic update
            const success = await onLikeClick();
            if (!success) {
                setLiked(false); // Revert if failed
            }
        }
    };
    

    return (
        <button
            className={`flex items-center justify-center text-xl ${
                liked ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleClick}
        >
            <FcLike className="w-6 h-6" color={liked ? "red" : "gray"} />
            <span className="ml-1">{likes}</span>
        </button>
    );
};


export default LikeButton;
