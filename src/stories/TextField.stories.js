import React from "react";
import { storiesOf } from "@storybook/react";
import { TextField } from "..";

storiesOf("TextField", module)
  .add("default", () => {
    return <TextField defaultValue="default text" />;
  })
  .add("editable", () => {
    return <TextField defaultValue="default text" editable />;
  });
