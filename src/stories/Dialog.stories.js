import React from "react";
import { storiesOf } from "@storybook/react";
import { DialogProvider, useDialog } from "..";

storiesOf("Dialog", module).add("default", () => {
  const Comp = () => {
    const { openDialog, isOpen } = useDialog();
    const handleOpen = () => openDialog("Dialog open!");
    return !isOpen ? <button onClick={handleOpen}>Open Dialog</button> : null;
  };

  return (
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );
});
