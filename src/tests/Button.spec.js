import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Button } from "..";

test("handle click", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me!</Button>);
  user.click(screen.queryByTestId("test-button"));
  expect(handleClick).toHaveBeenCalled();
  expect(handleClick).toHaveBeenCalled();
});
