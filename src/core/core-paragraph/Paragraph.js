import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DependentIconSizeContext, safeRest } from "../../util-helpers";
import * as typography from "../../shared-typography/typography";
import { spacing } from "../../shared-styles";

const paragraphColor = ({ invert }) =>
  invert ? typography.invertedColor : typography.color;
const paragraphInheritColor = ({ inheritColor }) =>
  inheritColor ? { color: "inherit" } : undefined;

const paragraphSize = ({ size }) => typography[size];
const paragraphBold = ({ bold, size }) =>
  bold ? typography.boldFont : typography[`${size}Font`];
const paragraphAlign = ({ align }) => ({
  textAlign: align,
});

export const StyledParagraph = styled.p(
  paragraphColor,
  typography.wordBreak,
  spacing.noSpacing,
  paragraphInheritColor,
  paragraphSize,
  paragraphBold,
  paragraphAlign,
  { sup: typography.sup }
);

const Paragraph = ({ size, invert, children, ...rest }, context) => {
  return (
    <DependentIconSizeContext.Provider value={{ paragraphSize: size, invert }}>
      <StyledParagraph
        {...safeRest(rest)}
        size={size}
        invert={invert}
        inheritColor={context.inheritColor}
      >
        {children}
      </StyledParagraph>
    </DependentIconSizeContext.Provider>
  );
};

Paragraph.propTypes = {
  bold: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Paragraph.defaultProps = {
  bold: false,
  size: "medium",
  align: "left",
  invert: false,
};

Paragraph.contextTypes = {
  inheritColor: PropTypes.bool,
};

export default Paragraph;
