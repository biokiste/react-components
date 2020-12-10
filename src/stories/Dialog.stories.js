import React from "react";
import { storiesOf } from "@storybook/react";
import { DialogProvider, useDialog } from "..";

storiesOf("Dialog", module).add("default", () => {
  const Comp = () => {
    const { openDialog } = useDialog();
    const handleOpen = () => openDialog("Dialog open!");
    return (
      <button onClick={handleOpen} className="dark:text-white">
        Open Dialog
      </button>
    );
  };

  return (
    <DialogProvider>
      <Comp />
    </DialogProvider>
  );
});
