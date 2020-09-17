import React, { forwardRef } from "react";

function getDefaultStyles(color, disabled) {
  if (disabled) {
    color = "gray";
  }
  const common =
    "font-bold uppercase text-base px-8 py-4 rounded outline-none focus:outline-none";
  const textColor = disabled ? `text-${color}-500` : "text-white";
  const bgColor = disabled
    ? `bg-${color}-200`
    : `bg-${color}-500 active:bg-${color}-600 hover:bg-${color}-400 focus:bg-${color}-400`;
  const extensions = disabled ? "cursor-not-allowed" : "";
  return `${common} ${textColor} ${bgColor} ${extensions}`.trimRight();
}

const Button = forwardRef((props, ref) => {
  const {
    onClick,
    children,
    classNameExt = "",
    color = "blue",
    disabled = false,
    ...otherProps
  } = props;
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      data-testid="test-button"
      className={`${getDefaultStyles(
        color,
        disabled
      )} ${classNameExt}`.trimRight()}
      style={{ transition: "all .15s ease" }}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export default Button;
