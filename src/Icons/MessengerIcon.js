import React from "react";
import { FaFacebookMessenger } from "react-icons/fa"; // Example Messenger icon

const MessengerIcon = ({ postLink }) => {
    const handleClick = () => {
        if (!postLink) {
            console.error("Post link is not defined!");
            return;
        }

        // Construct the Messenger share URL
        const messengerUrl = `https://www.messenger.com/t/?link=${encodeURIComponent(postLink)}`;

        // Open the Messenger sharing page in a new tab
        window.open(messengerUrl, "_blank");
    };

    return (
        <div
            className="text-blue-500 cursor-pointer"
            onClick={handleClick}
            title="Share on Messenger"
        >
            <FaFacebookMessenger size={25} />
        </div>
    );
};

export default MessengerIcon;
