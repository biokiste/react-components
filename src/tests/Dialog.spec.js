import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { DialogProvider, useDialog } from "..";

test("show custom message with close button", async () => {
  const customMessage = "custom message";

  const Comp = (props) => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog(customMessage), [openDialog]);
    return null;
  };

  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );

  const dialogMessage = screen.getByText(customMessage);
  expect(dialogMessage).toBeInTheDocument();

  const closeButton = screen.getByText("Close");
  user.click(closeButton);
  expect(dialogMessage).not.toBeInTheDocument();
});

test("replace close button label", () => {
  const customMessage = "custom message";
  const customCloseLabel = "Confirm";

  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog(customMessage), [openDialog]);
    return null;
  };

  render(
    <DialogProvider closeLabel={customCloseLabel}>
      <Comp />
    </DialogProvider>
  );

  const dialogMessage = screen.getByText(customMessage);

  const okButton = screen.getByText(customCloseLabel);
  user.click(okButton);
  expect(dialogMessage).not.toBeInTheDocument();
});

test("use custom actions", () => {
  const customMessage = "custom message";
  const customAction = { label: "Custom", handler: jest.fn() };

  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog(customMessage, [customAction]), [openDialog]);
    return null;
  };

  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );

  const button = screen.getByText(customAction.label);
  user.click(button);
  expect(customAction.handler).toHaveBeenCalled();
});

test("render passed nodes instead of message string", () => {
  const testId = "custom-test-id";
  const nodeContent = "custom node content";
  const Node = () => <p data-testid={testId}>{nodeContent}</p>;
  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog(<Node />), [openDialog]);
    return null;
  };
  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );
  const node = screen.getByTestId(testId);
  expect(node).toHaveTextContent(nodeContent);
});
