import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import "../src/styles/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  darkMode: {
    stylePreview: true,
  },
};
