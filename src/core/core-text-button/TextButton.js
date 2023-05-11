import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  colorGreyGainsboro,
  colorGreyRaven,
  colorGreyShark,
  colorWhite,
} from "../core-colours/colours";
import { componentWithName, or } from "../../util-prop-types";
import { safeRest } from "../../util-helpers";
import { medium } from "../../shared-typography/typography";

const baseButton = {
  boxSizing: "border-box",
  padding: "0.25rem 0rem",
  cursor: "pointer",
  background: colorWhite,
  transition: "all 0.2s ease-in-out",
  position: "relative",
  borderRadius: "0.1875rem",
  color: colorGreyShark,
  textDecoration: "underline",
  borderStyle: "none",
  "&:hover": {
    textDecoration: "none",
  },
  "&:active": {
    background: colorGreyGainsboro,
    boxShadow: `0 0 0 0.125rem ${colorGreyGainsboro}`,
    textDecoration: "underline",
  },
  "&:focus": {
    outline: "none !important",
    boxShadow: `0 0 0 0.125rem ${colorGreyRaven}`,
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none !important",
  },
};

export const StyledTextButton = styled.button(baseButton, medium);

const TextButton = ({ children, ...rest }) => (
  <StyledTextButton {...safeRest(rest)}>{children}</StyledTextButton>
);

TextButton.propTypes = {
  children: or([PropTypes.string, componentWithName("A11yContent")]).isRequired,
};

export default TextButton;
