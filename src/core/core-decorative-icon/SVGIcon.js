import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import {
  colorNemetonPurple,
  colorGreyShark,
  colorWhite,
} from "../core-colours/colours";
import { pixelToRem, safeRest } from "../../util-helpers";
import { warn } from "../../utils/warn";

const getColour = (variant) => {
  switch (variant) {
    case "alternative":
      return colorGreyShark;
    case "inverted":
      return colorWhite;
    case "default":
    default:
      return colorNemetonPurple;
  }
};

const svgVariant = ({ variant }) => ({
  "& > svg": { fill: getColour(variant) },
});
const svgSize = ({ size }) => ({
  "& > svg": { width: pixelToRem(size), height: pixelToRem(size) },
});

const StyledSVGIcon = styled.i(
  {
    display: "inline-flex",
  },
  svgVariant,
  svgSize
);
const SVGIcon = ({ onClick, ...rest }) => {
  if (onClick) {
    warn(
      "SVGIcon",
      "SVG Icon is not interactive and does not accept events through props."
    );
  }
  return <StyledSVGIcon {...safeRest(rest)} aria-hidden="true" />;
};

SVGIcon.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["default", "alternative", "inverted"]),
  size: PropTypes.oneOf([16, 20, 24, 32, 48]),
};

SVGIcon.defaultProps = {
  variant: "default",
  size: 24,
  onClick: undefined,
};

export default SVGIcon;
