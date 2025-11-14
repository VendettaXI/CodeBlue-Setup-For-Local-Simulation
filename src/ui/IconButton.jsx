import React from "react";
import "./IconButton.css";

const IconButton = ({ 
  children, 
  onClick, 
  ariaLabel, 
  className = "",
  variant = "default",
  size = "default"
}) => {
  return (
    <button
      type="button"
      className={`icon-button icon-button-${variant} icon-button-${size} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;
