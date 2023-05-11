import { noSpacing } from "./spacing";
import { none } from "./borders";
import { font } from "./forms";
import { color } from "../shared-typography/typography";

export const noStyle = {
  ...noSpacing,
  ...none,
  ...font,
  ...color,
  appearance: "none",
  background: "none",
  boxShadow: "none",
  cursor: "pointer",
};
