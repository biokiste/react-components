import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
} from "react";
import FocusLock from "react-focus-lock";
import { Button } from "..";

const DialogContext = createContext();

const initialState = {
  isOpen: false,
  body: "",
  actions: [],
  important: false,
  closeButton: {
    label: "Close",
  },
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

  const openDialog = useCallback((options) => {
    const { message, body, ...otherOptions } = options || {};
    dispatch({
      type: "open",
      data: {
        isOpen: true,
        body: message || body,
        ...otherOptions,
      },
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
    body,
    close,
    isOpen = false,
    actions = [],
    important,
    closeButton,
  } = props;

  return isOpen ? (
    <FocusLock>
      <div
        data-testid="dialog-background"
        role="dialog"
        onClick={!important && close}
        className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      >
        <div
          data-testid="dialog-body"
          onClick={(evt) => evt.stopPropagation()}
          className="w-full p-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl"
        >
          {typeof body === "string" ? (
            <p className="dark:text-white">{body}</p>
          ) : (
            body
          )}
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
            <Button
              data-testid="dialog-default-close-button"
              onClick={closeButton?.handler || close}
            >
              {closeButton.label}
            </Button>
          )}
        </div>
      </div>
    </FocusLock>
  ) : null;
}

export default { DialogProvider, useDialog };
