import React from "react";
import { RiTelegram2Fill } from "react-icons/ri";

const TelegramIcon = ({ postLink }) => {
    const handleClick = () => {
        if (!postLink) {
            console.error("Post link is not defined!");
            return;
        }

        // Construct the Telegram share URL
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(postLink)}&text=${encodeURIComponent("Check out this link!")}`;

        // Open the Telegram sharing page in a new tab
        window.open(telegramUrl, "_blank");
    };

    return (
        <div
            className="text-blue-400 cursor-pointer"
            onClick={handleClick}
            title="Share on Telegram"
        >
            <RiTelegram2Fill size={25} />
        </div>
    );
};

export default TelegramIcon;
