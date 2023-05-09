import styled from "styled-components";
import Box from "../core-box/Box";
import { borders, forms, position } from "../../shared-styles";

import {
  colorCardinal,
  colorGreyAthens,
  colorGreyShuttle,
  colorPrimary,
  colorWhite,
} from "../core-colours/colours";
import { color, medium, mediumFont } from "../../shared-typography/typography";

export const StyledLabelContainer = styled(Box)({
  alignItems: "center",
});

export const StyledInput = styled.input(
  {
    boxSizing: "border-box",
    width: "100%",
    margin: 0,
    outline: 0,
    textOverflow: "ellipsis",
    borderColor: colorGreyShuttle,
    "&::placeholder": {
      font: "inherit",
      letterSpacing: "inherit",
      lineHeight: "inherit",
      color: colorGreyShuttle,
    },
  },
  borders.thin,
  borders.rounded,
  forms.font,
  medium,
  mediumFont,
  color,
  ({ withFeedbackIcon }) => ({
    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
      appearance: "none",
      margin: 0,
    },
    "-moz-appearance": "textfield",
    minHeight: forms.inputHeight.height,
    maxHeight: forms.inputHeight.height,
    padding: withFeedbackIcon ? "0.5rem 3rem 0.5rem 1rem" : "0.5rem 1rem",
  }),
  {
    "&:focus": {
      borderColor: "transparent",
      boxShadow: `0 0 4px 1px ${colorGreyShuttle}`,
      backgroundColor: colorWhite,
    },
  },
  ({ feedback }) => {
    let borderColor;
    if (feedback === "success") {
      borderColor = colorPrimary;
    } else if (feedback === "error") {
      borderColor = colorCardinal;
    }
    return {
      "&:not(:focus)": {
        borderColor,
      },
    };
  },
  ({ disabled }) => {
    if (disabled) {
      return {
        backgroundColor: colorGreyAthens,
        borderColor: "transparent",
        "&:not(:focus)": {
          borderColor: "transparent",
        },
      };
    }
    return {};
  }
);

export const StyledFeedbackIcon = styled.div(
  {
    right: "1rem",
  },
  position.absolute,
  position.centerVertically
);

// FeedbackIcon component

export const StyledIcon = styled.div({ lineHeight: 1 });
