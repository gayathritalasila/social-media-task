import React from 'react';

const Message = ({ type, message, onClose }) => {
  const messageStyles = {
    success: 'bg-green-100 border-l-4 border-green-500 text-green-700',
    error: 'bg-red-100 border-l-4 border-red-500 text-red-700',
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`p-4 max-w-sm mx-auto mb-4 rounded-t-xl shadow-md ${messageStyles[type] || messageStyles.success} flex items-center justify-between fixed top-4 left-1/2 transform -translate-x-1/2 z-50`}
    >
      <div className="flex items-center">
        <span className="font-semibold">{message}</span>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-lg font-bold text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
    </div>
  );
};

export default Message;
