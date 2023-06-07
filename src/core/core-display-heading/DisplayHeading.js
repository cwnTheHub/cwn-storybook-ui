import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { spacing } from "../../shared-styles";
import {
  baseSupSubScripts,
  helveticaNeueThin35,
  wordBreak,
} from "../../shared-typography/typography";
import { colorSecondary, colorWhite } from "../core-colours/colours";
import { media } from "../core-responsive";
import { safeRest } from "../../util-helpers";

const StyledDisplayHeading = styled.h1(
  spacing.noSpacing,
  wordBreak,
  helveticaNeueThin35,
  ({ invert }) => ({
    color: invert ? colorWhite : colorSecondary,
    fontSize: "2.75rem",
    lineHeight: 1.14,
    ...media.from("md").css({
      fontSize: "4.5rem",
      lineHeight: "1.11",
      letterSpacing: "0.2px",
    }),
  }),
  {
    sup: {
      ...baseSupSubScripts,
      fontSize: "1.25rem",
      top: "-1.2em",
      ...media.from("md").css({
        top: "-2.2em",
      }),
    },
  }
);

const DisplayHeading = ({ invert, children, ...rest }) => (
  <StyledDisplayHeading {...safeRest(rest)} invert={invert}>
    {children}
  </StyledDisplayHeading>
);

DisplayHeading.propTypes = {
  /**
   * Invert the text color to appear light on dark backgrounds.
   */
  invert: PropTypes.bool,
  /**
   * The text. Can be text, other components, or HTML elements.
   */
  children: PropTypes.node.isRequired,
};

DisplayHeading.defaultProps = {
  invert: false,
};

export default DisplayHeading;
