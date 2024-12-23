import React from "react";
import { FaDiscord } from "react-icons/fa"; // Example Discord icon

const DiscordIcon = ({ postLink }) => {
    const handleClick = () => {
        if (!postLink) {
            console.error("Post link is not defined!");
            return;
        }

        // Copy the post link to clipboard for easy sharing on Discord
        navigator.clipboard.writeText(postLink).then(() => {
            alert("Post link copied to clipboard! Share it in your Discord chat.");
        }).catch((error) => {
            console.error("Failed to copy the link:", error);
        });
    };

    return (
        <div
            className="text-purple-500 cursor-pointer"
            onClick={handleClick}
            title="Share on Discord"
        >
            <FaDiscord size={25} />
        </div>
    );
};

export default DiscordIcon;
