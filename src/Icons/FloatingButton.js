import React from "react";
import { FaPlus } from "react-icons/fa";

const FloatingButton = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-10 right-10 bg-black rounded-full w-16 h-16 flex items-center justify-center text-white shadow-lg"
      onClick={onClick}
    >
      <FaPlus size={24} /> 
    </button>
  );
};

export default FloatingButton;