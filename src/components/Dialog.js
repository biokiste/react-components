import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
} from "react";
import { Button } from "..";

const DialogContext = createContext();

const initialState = {
  isOpen: false,
  content: "",
  actions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "open": {
      return { ...state, ...action.data };
    }
    case "close": {
      return initialState;
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function DialogProvider(props) {
  const { children, ...otherProps } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const openDialog = useCallback((msg, act) => {
    dispatch({
      type: "open",
      data: { content: msg, actions: act, isOpen: true },
    });
  }, []);
  const closeDialog = useCallback(() => {
    dispatch({ type: "close" });
  }, []);
  return (
    <DialogContext.Provider
      value={{ openDialog, closeDialog, isOpen: state.isOpen }}
    >
      <Dialog {...state} close={closeDialog} {...otherProps} />
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
