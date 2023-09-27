// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import Theme from "./Theme";
import "../src/styles/global.css";

addons.setConfig({
  theme: Theme,
  sidebar: {
    showRoots: false,
  },
  showToolbar: true,
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
