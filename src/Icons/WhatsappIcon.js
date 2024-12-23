import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";

const WhatsappIcon = ({ postLink }) => {
    const handleClick = () => {
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(
            postLink
        )}&text=Check out this post!`;
        window.open(shareUrl, "_blank");
    };

    return (
        <div
            className="text-green-500 cursor-pointer"
            onClick={handleClick}
            title="Share on WhatsApp"
        >
            <IoLogoWhatsapp size={25} />
        </div>
    );
};

export default WhatsappIcon;
