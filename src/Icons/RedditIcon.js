import React from "react";
import { FaReddit } from "react-icons/fa"; // Example Reddit icon

const RedditIcon = ({ postLink }) => {
    const handleClick = () => {
        const shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
            postLink
        )}`; // Reddit sharing URL
        window.open(shareUrl, "_blank");
    };

    return (
        <div
            className="text-orange-500 cursor-pointer"
            onClick={handleClick}
            title="Share on Reddit"
        >
            <FaReddit size={25} />
        </div>
    );
};

export default RedditIcon;
