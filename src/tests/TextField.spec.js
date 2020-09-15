import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { TextField } from "..";

test("display default text", () => {
  const value = "default text";
  const { rerender } = render(<TextField />);

  const node = screen.queryByTestId("text-field-value");
  expect(node).toHaveTextContent("");

  rerender(<TextField defaultValue={value} />);
  expect(node).toHaveTextContent(value);
});

test("handle editing text", () => {
  const newValue = "new value";

  const { rerender } = render(<TextField />);
  const textFieldValue = screen.queryByTestId("text-field-value");
  expect(textFieldValue).not.toHaveTextContent(newValue);
  expect(screen.queryByTestId("text-field-edit")).not.toBeInTheDocument();

  rerender(<TextField editable />);
  const editButton = screen.queryByTestId("text-field-edit");
  expect(editButton).toBeInTheDocument();
  user.click(editButton);

  const dialogContent = screen.queryByTestId("text-field-edit-dialog-content");
  expect(dialogContent).toBeInTheDocument();

  // edit value and save
  user.type(screen.queryByTestId("text-field-edit-dialog-input"), newValue);
  user.click(screen.queryByText("Save"));
  expect(dialogContent).not.toBeInTheDocument();
  expect(textFieldValue).toHaveTextContent(newValue);

  // edit value and abort
  user.click(editButton);
  user.type(screen.queryByTestId("text-field-edit-dialog-input"), "");
  user.click(screen.queryByText("Close"));
  expect(textFieldValue).toHaveTextContent(newValue);
});
