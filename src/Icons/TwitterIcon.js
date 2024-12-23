import React from "react";
import { FaTwitter } from "react-icons/fa";

const TwitterIcon = ({ postLink })=>{
    const handleClick = () => {
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            postLink
        )}&text=Check out this post!`;
        window.open(shareUrl, "_blank");
    };

    return(
        <div className="text-blue-400 cursor-pointer" onClick={handleClick}>
        <FaTwitter size={25} />
        </div>
    )
};

export default TwitterIcon;