import React from "react";
import "./Tag.css";

const Tag = ({ children, variant = "default", className = "" }) => {
  return (
    <span className={`ui-tag ui-tag-${variant} ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
