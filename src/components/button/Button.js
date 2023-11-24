import React from "react";
import styles from "./Button.module.css";

const Button = ({ size, text, onClick }) => {
  const sizeClass =
    size === "long"
      ? styles.long_button
      : size === "mid"
      ? styles.mid_button
      : size === "short"
      ? styles.short_button
      : "";

  return (
    <button className={`${sizeClass}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
