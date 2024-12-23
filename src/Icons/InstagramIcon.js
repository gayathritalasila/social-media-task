import React from "react";
import { FaSquareInstagram } from "react-icons/fa6"; // Example Instagram icon

const InstagramIcon = ({ postLink }) => {
    const handleClick = () => {
        if (!postLink) {
            console.error("Post link is not defined!");
            return;
        }

        // Construct the Instagram share URL (for mobile app)
        const instagramUrl = `https://www.instagram.com/create/story/?url=${encodeURIComponent(postLink)}`;

        // Open the Instagram share page in a new tab (for mobile or desktop app)
        window.open(instagramUrl, "_blank");
    };

    return (
        <div
            className="text-pink-500 cursor-pointer"
            onClick={handleClick}
            title="Share on Instagram"
        >
            <FaSquareInstagram size={20} color="#E4405F" />
        </div>
    );
};

export default InstagramIcon;
