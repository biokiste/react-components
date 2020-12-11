import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { DialogProvider, useDialog } from "..";

test("show custom message with close button", async () => {
  const customMessage = "custom message";

  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog({ message: customMessage }), [openDialog]);
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
  const customCloseLabel = "Confirm";

  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog({ closeButton: { label: customCloseLabel } }), [
      openDialog,
    ]);
    return null;
  };

  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );

  const closeButton = screen.getByText(customCloseLabel);
  user.click(closeButton);
  expect(closeButton).not.toBeInTheDocument();
});

test("use custom actions", () => {
  const customAction = { label: "Custom", handler: jest.fn() };

  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog({ actions: [customAction] }), [openDialog]);
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

test("add node to body", () => {
  const testId = "custom-test-id";
  const nodeContent = "custom node content";
  const Node = () => <p data-testid={testId}>{nodeContent}</p>;
  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog({ body: <Node /> }), [openDialog]);
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

test("close on background click", () => {
  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog(), [openDialog]);
    return null;
  };

  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );

  const body = screen.getByTestId("dialog-body");
  user.click(body);
  expect(body).toBeInTheDocument();

  const background = screen.getByTestId("dialog-background");
  user.click(background);
  expect(body).not.toBeInTheDocument();
});

test("needs user interaction", () => {
  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(
      () =>
        openDialog({
          important: true,
        }),
      [openDialog]
    );
    return null;
  };

  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );

  const background = screen.getByTestId("dialog-background");
  const body = screen.getByTestId("dialog-body");
  user.click(background);
  expect(body).toBeInTheDocument();

  const button = screen.getByTestId("dialog-default-close-button");
  user.click(button);
  expect(body).not.toBeInTheDocument();
});
