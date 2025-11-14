import React from "react";
import "./Typography.css";

export const H1 = ({ children, className = "" }) => (
  <h1 className={`typography-h1 ${className}`}>{children}</h1>
);

export const Title = ({ children, className = "" }) => (
  <h2 className={`typography-title ${className}`}>{children}</h2>
);

export const Body = ({ children, className = "" }) => (
  <p className={`typography-body ${className}`}>{children}</p>
);

export const Meta = ({ children, className = "" }) => (
  <span className={`typography-meta ${className}`}>{children}</span>
);

export const Caption = ({ children, className = "" }) => (
  <span className={`typography-caption ${className}`}>{children}</span>
);
