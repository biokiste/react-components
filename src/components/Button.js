import React from "react";

function Button(props) {
  const { onClick, children, ...otherProps } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="test-button"
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
