import React from 'react';

const Button = ({ children, onClick, type = 'button', fullWidth = false, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;