import media from "../core/core-responsive/media";
import { fontNemeton } from "../shared-typography/typography";

export const inputHeight = {
  height: "3rem",
};

export const font = {
  fontFamily: fontNemeton,
};

export const baseButton = {
  margin: 0,
  padding: "0 2rem",
  cursor: "pointer",
  background: "none",
  transition: "background 0.2s",
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  minHeight: "3.25rem",
  ...media.from("md").css({
    display: "inline-flex",
    width: "auto",
    minWidth: "180px",
  }),
  "&:after": {
    content: "",
    minHeight: "inherit",
    fontSize: 0,
  },
};
