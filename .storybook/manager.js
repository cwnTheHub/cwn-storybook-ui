// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import NewTheme from "./NdsTheme";

addons.setConfig({
  theme: NewTheme,
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
