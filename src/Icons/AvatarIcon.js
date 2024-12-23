import React from "react";

const AvatarIcon = ({ displayImg, userName }) => {
    const getInitials = (fullName) => {
        if (!fullName) return "U";
        const names = fullName.split(" ");
        return names.map((n) => n[0].toUpperCase()).join("").slice(0, 2);
    };

    return (
        <div className="relative flex justify-center">
            {displayImg ? (
                <img
                    src={displayImg}
                    alt={userName || "User"}
                    className="rounded-full w-24 h-24 border-4 border-white shadow-lg"
                />
            ) : (
                <div className="flex items-center justify-center bg-gray-300 rounded-full w-24 h-24 text-white text-2xl font-semibold shadow-lg">
                    {getInitials(userName)}
                </div>
            )}
        </div>
    );
};

export default AvatarIcon;
