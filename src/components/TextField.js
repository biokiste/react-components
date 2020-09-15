import React, { useState, useRef } from "react";
import { DialogProvider, useDialog } from "..";

function TextFieldContainer(props) {
  const { defaultValue = "", ...otherProps } = props;
  const [value, setValue] = useState("");
  return (
    <DialogProvider>
      <TextField
        value={value === "" ? defaultValue : value}
        setValue={setValue}
        {...otherProps}
      />
    </DialogProvider>
  );
}

function TextField(props) {
  const {
    value,
    setValue,
    editable,
    editLabel = "Edit",
    saveLabel = "Save",
    closeLabel = "Close",
  } = props;
  const { openDialog, closeDialog } = useDialog();
  const inputRef = useRef();

  const handleClick = () => {
    openDialog(
      <div data-testid="text-field-edit-dialog-content">
        <input
          data-testid="text-field-edit-dialog-input"
          ref={inputRef}
          defaultValue={value}
        />
      </div>,
      [
        {
          label: saveLabel,
          handler: () => {
            setValue(inputRef.current.value || value);
            closeDialog();
          },
        },
        { label: closeLabel, handler: closeDialog },
      ]
    );
  };

  return (
    <>
      <p data-testid="text-field-value">{value}</p>
      {editable ? (
        <button data-testid="text-field-edit" onClick={handleClick}>
          {editLabel}
        </button>
      ) : null}
    </>
  );
}

export default TextFieldContainer;
