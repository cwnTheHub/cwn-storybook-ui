import { globalDecorators } from "./decorators";
import "../src/styles/global.css";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";

export default {
  parameters: {
    options: {
      storySort: {
        order: ["Introduction","Installation","ChangeLog", "Core components", "*"],
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <Controls />
        <Stories />
      </>
    ),
  },
};

export const decorators = globalDecorators;
