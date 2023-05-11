import styled from "styled-components";
import { buttons } from "../../../shared-styles";
import { colorWhite } from "../../core-colours/colours";


const getOutline = ({ variant }) => {
  if (variant !== "inverted") {
    return {
      outline: "none",
      "&:focus::-moz-focus-inner": {
        border: 0,
      },
    };
  }

  return {
    "&:focus": {
      outline: "transparent",
      border: `0.125rem solid ${colorWhite}`,
      borderRadius: "50%",
    },
    "&:active": {
      borderRadius: "50%",
      backgroundColor: "rgba(0,0,0,0.5)",
      backgroundBlendMode: "multiply",
    },
  };
};

const StyledInteractiveIconButton = styled.button(buttons.noStyle, getOutline, {
  width: "2.5rem",
  height: "2.5rem",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  "-webkit-tap-highlight-color": "transparent",
});

export default StyledInteractiveIconButton;
