import React from "react";
import { FaFacebook } from "react-icons/fa"; // Example Facebook icon

const FacebookIcon = ({ postLink }) => {
    const handleClick = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postLink
        )}&text=Check out this post!`; // Facebook sharing URL
        window.open(shareUrl, "_blank");
    };

    return (
        <div
            className="text-blue-600 cursor-pointer"
            onClick={handleClick}
            title="Share on Facebook"
        >
            <FaFacebook size={25} />
        </div>
    );
};

export default FacebookIcon;
