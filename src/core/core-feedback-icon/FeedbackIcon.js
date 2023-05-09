import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getCopy, pixelToRem, safeRest } from "../../util-helpers";

const StyledSVG = styled.svg(({ width, height }) => ({
  width: `${width}rem`,
  height: `${height}rem`,
}));
/**
 * @version ./package.json
 */
const FeedbackIcon = ({
  width,
  height,
  copy,
  copyDictionary,
  optionalText,
  children,
  ...rest
}) => {
  if (rest.onClick) {
    console.warn(
      "FeedbackIcon",
      "FeedbackIcons are not meant to be interactive, do not pass an onClick handler."
    );
  }

  const a11yText = getCopy(
    copyDictionary,
    !optionalText ? copy || "en" : copy
  ).a11yText;

  if (!optionalText && a11yText === "") {
    console.warn(
      "FeedbackIcon",
      "The `copy` prop is required, please provide some copy by supplying an object with `a11yText` as a key and your copy as a value."
    );
  }

  return (
    <StyledSVG
      {...safeRest(rest)}
      role="img"
      aria-hidden={a11yText === "" ? true : undefined}
      width={pixelToRem(width)}
      height={pixelToRem(height)}
    >
      {a11yText && <title>{a11yText}</title>}
      {children}
    </StyledSVG>
  );
};

FeedbackIcon.propTypes = {
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      a11yText: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  copyDictionary: PropTypes.object,
  optionalText: PropTypes.bool,
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

FeedbackIcon.defaultProps = {
  optionalText: false,
  copyDictionary: {},
};

export default FeedbackIcon;
