import React, { createContext, useContext, useState, useCallback } from "react";
import { Button } from "..";

const DialogContext = createContext();

function DialogProvider(props) {
  const { children, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [actions, setActions] = useState([]);
  const openDialog = useCallback((msg, act) => {
    setIsOpen(true);
    setContent(msg);
    setActions(act);
  }, []);
  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setContent("");
    setActions([]);
  }, []);
  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      <Dialog
        content={content}
        isOpen={isOpen}
        actions={actions}
        close={closeDialog}
        {...otherProps}
      />
      {children}
    </DialogContext.Provider>
  );
}

function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
}

function Dialog(props) {
  const {
    content,
    close,
    isOpen = false,
    actions = [],
    closeLabel = "Close",
  } = props;

  return isOpen ? (
    <>
      {typeof content === "string" ? <p>{content}</p> : content}
      {actions.length > 0 ? (
        actions.map((action) => {
          const { label, handler } = action;
          return (
            <Button key={label} onClick={handler}>
              {label}
            </Button>
          );
        })
      ) : (
        <Button onClick={close}>{closeLabel}</Button>
      )}
    </>
  ) : null;
}

export default { DialogProvider, useDialog };
