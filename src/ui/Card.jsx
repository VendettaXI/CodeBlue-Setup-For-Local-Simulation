import React from "react";
import "./Card.css";

const Card = ({ children, className = "", onClick }) => {
  const Component = onClick ? "button" : "div";
  
  return (
    <Component 
      className={`ui-card ${className}`}
      onClick={onClick}
      type={onClick ? "button" : undefined}
    >
      {children}
    </Component>
  );
};

export default Card;
