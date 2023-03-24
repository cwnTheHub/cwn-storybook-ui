import { BrowserRouter } from "react-router-dom";

export const LinkClickable = (Story) => (
  <BrowserRouter>
    <Story />
  </BrowserRouter>
);

export const globalDecorators = [LinkClickable];
