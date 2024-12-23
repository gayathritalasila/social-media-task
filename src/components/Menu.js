import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useOutsideClick from "./useOutsideClick";
import HomeIcon from "../Icons/HomeIcon";
import SettingsIcon from "../Icons/SettingsIcon";

const Menu = ({ isMenuVisible, toggleMenu, toggleSettingsPopup, setIsMenuVisible }) => {
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useOutsideClick(menuRef, () => setIsMenuVisible(false));

    return (
        <div
            ref={menuRef}
            id="menu"
            className={`bg-gray-200 h-full flex flex-col items-start py-6 space-y-8 transition-all duration-300 ${
                isMenuVisible ? "w-64 px-4" : "w-16 px-2"
            } z-20`}
        >
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
                <span
                    className={`text-black text-xl font-bold ${
                        isMenuVisible ? "block" : "hidden"
                    }`}
                >
                    Vibesnap
                </span>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col w-full space-y-4">
                <div className="group flex items-center">
                    <Link
                        to="/landingPage"
                        className="flex items-center w-full space-x-4 p-3 rounded-md hover:bg-gray-400"
                    >
                        <HomeIcon className="text-white w-6 h-6" />
                        {isMenuVisible && (
                            <span className="text-black text-sm">Home</span>
                        )}
                    </Link>
                </div>
                <div className="group flex items-center">
                    <button
                        id="settings-icon"
                        className="flex items-center w-full space-x-4 p-3 rounded-md hover:bg-gray-400"
                        onClick={toggleSettingsPopup}
                    >
                        <SettingsIcon className="text-white w-6 h-6" />
                        {isMenuVisible && (
                            <span className="text-black text-sm">Settings</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
