import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"; 

const BackButton = () =>{
    const navigate = useNavigate();
    const handleBackClick = () => {
        if (location.pathname === "/edit-profile") {
            navigate("/profile"); // Redirect to the profile page
        } else if(location.pathname === "/profile"){
            navigate("/landingPage");
        } else {
            navigate(-1); // Go back one step in history
        }
    };

    return(
        <div className="cursor-pointer p-2 rounded-full" onClick={handleBackClick}>
        <IoMdArrowRoundBack className="text-3xl" />
        </div>
    )
};

export default BackButton;