import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "..";

storiesOf("Button", module).add("default", () => {
  return <Button onClick={action("Button clicked!")}>Click me!</Button>;
});
