import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { DialogProvider, useDialog } from "..";

test("custom message and title", async () => {
  const customTitle = "custom title";
  const customMessage = "custom message";

  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(
      () => openDialog({ title: customTitle, message: customMessage }),
      [openDialog]
    );
    return null;
  };

  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );

  const dialogMessage = screen.getByText(customMessage);
  const dialogTitle = screen.getByText(customTitle);
  expect(dialogMessage).toBeInTheDocument();
  expect(dialogTitle).toBeInTheDocument();
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

test("add nodes to body and head", () => {
  const bodyTestId = "body-node-test-id";
  const headTestId = "head-node-test-id";
  const bodyContent = "custom body content";
  const headContent = "custom node content";
  const BodyNode = () => <p data-testid={bodyTestId}>{bodyContent}</p>;
  const HeadNode = () => <p data-testid={headTestId}>{headContent}</p>;
  const Comp = () => {
    const { openDialog } = useDialog();
    useEffect(() => openDialog({ body: <BodyNode />, head: <HeadNode /> }), [
      openDialog,
    ]);
    return null;
  };
  render(
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );
  const body = screen.getByTestId(bodyTestId);
  const head = screen.getByTestId(headTestId);
  expect(body).toHaveTextContent(bodyContent);
  expect(head).toHaveTextContent(headContent);
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
