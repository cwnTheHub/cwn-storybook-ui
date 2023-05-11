import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DependentIconSizeContext, safeRest } from "../../util-helpers";
import * as typography from "../../shared-typography/typography";


const textColor = ({ invert }) =>
  invert ? typography.invertedColor : typography.color;
const textInheritColor = ({ inheritColor }) =>
  inheritColor ? { color: "inherit" } : undefined;
const textSize = ({ size }) => typography[size];
const textBold = ({ bold, size }) =>
  bold ? typography.boldFont : typography[`${size}Font`];
const textBlock = ({ block }) => (block ? typography.blockText : undefined);

// This named export is not guaranteed to be maintained and may be removed at any time.
export const StyledText = styled.span(
  textColor,
  textInheritColor,
  textSize,
  textBold,
  textBlock,
  {
    sup: typography.sup,
  }
);

const Text = ({ children, size, invert, ...rest }, context) => (
  <DependentIconSizeContext.Provider value={{ paragraphSize: size, invert }}>
    <StyledText
      {...safeRest(rest)}
      size={size}
      invert={invert}
      inheritColor={context.inheritColor}
    >
      {children}
    </StyledText>
  </DependentIconSizeContext.Provider>
);

Text.propTypes = {
  block: PropTypes.bool,
  bold: PropTypes.bool,
  size: PropTypes.oneOf(["base", "small", "medium", "large"]),
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  block: false,
  bold: false,
  size: "base",
  invert: false,
};

Text.contextTypes = {
  inheritColor: PropTypes.bool,
};

export default Text;
