import React from "react";
import { render, screen } from "@testing-library/react";
import { Test } from "..";

test("render Test component", () => {
  render(<Test />);
  expect(screen.getByText("Test")).toBeInTheDocument();
});
