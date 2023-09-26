import { create } from "@storybook/theming/create";
import logo from "./assets/nds.png";

export default create({
  base: "light",
  // Typography
  fontBase: '"Roboto", sans-serif',
  fontCode: "Montserrat",

  brandTitle: "My custom Storybook",
  brandImage: logo,
  brandTarget: "_self",

  //
  colorPrimary: "#2a2c2e",
  colorSecondary: "#0077b6",

  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#585C6D",
  appBorderRadius: 4,

  // Text colors
  textColor: "#2a2c2e",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#000",
  barSelectedColor: "#fff",
  barBg: "#0077b6",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#10162F",
  inputTextColor: "#10162F",
  inputBorderRadius: 0,
});
