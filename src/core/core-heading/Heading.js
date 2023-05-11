import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import {
  helveticaNeueLight45,
  helveticaNeueThin35,
  helveticaNeueMedium65,
  wordBreak,
  baseSupSubScripts,
} from "../../shared-typography/typography";
import media from "../core-responsive/media";
import { colorWhite, colorText, colorSecondary } from "../core-colours/colours";
import { safeRest } from "../../util-helpers";

const HeadingLevels = {
  h1: {
    ...helveticaNeueLight45,
    fontSize: "1.75rem",
    lineHeight: "1.29", // 36px
    letterSpacing: "-1.6px",
    ...media.from("md").css({
      ...helveticaNeueThin35,
      fontSize: "2.75rem",
      lineHeight: "1.18",
      letterSpacing: "0",
    }),
    sup: {
      ...baseSupSubScripts,
      fontSize: "1.25rem",
      top: "-1em",
      ...media.from("md").css({ fontSize: "1.25rem", top: "-1.3em" }),
    },
  },
  h2: {
    ...helveticaNeueLight45,
    fontSize: "1.5rem",
    lineHeight: "1.33", // 30px
    letterSpacing: "-0.7px",
    ...media.from("md").css({
      fontSize: "1.75rem",
      lineHeight: "1.29",
      letterSpacing: "-0.8px",
    }),
    sup: {
      ...baseSupSubScripts,
      fontSize: "1rem",
      top: "-0.8em",
      ...media.from("md").css({ fontSize: "1rem", top: "-0.7em" }),
    },
  },
  h3: {
    ...helveticaNeueMedium65,
    fontSize: "1.25rem",
    lineHeight: "1.4", // 28px
    letterSpacing: "-0.6px",
    sup: {
      ...baseSupSubScripts,
      fontSize: "0.875rem",
      top: "-0.5em",
    },
  },
  h4: {
    ...helveticaNeueMedium65,
    fontSize: "1rem",
    lineHeight: "1.25", // 20px
    letterSpacing: "-0.6px",
    sup: {
      ...baseSupSubScripts,
      fontSize: "0.875rem",
      top: "-0.5em",
    },
  },
};
export const StyledHeading = styled.h1(wordBreak, ({ level, invert }) => {
  const baseColor =
    level === "h1" || level === "h2" ? colorSecondary : colorText;
  const color = invert ? colorWhite : baseColor;
  return {
    color,
    ...HeadingLevels[`${level}`],
    "& > span": {
      letterSpacing: "inherit",
    },
  };
});

const Heading = forwardRef(
  ({ level, tag = level, invert, children, ...rest }, ref) => {
    return (
      <StyledHeading
        {...safeRest(rest)}
        ref={ref}
        as={tag}
        level={level}
        invert={invert}
        data-testid="heading"
      >
        {children}
      </StyledHeading>
    );
  }
);

Heading.displayName = "Heading";

Heading.propTypes = {
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4"]).isRequired,
  tag: PropTypes.oneOf(["h1", "h2", "h3", "h4", "div", "span"]),
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
Heading.defaultProps = {
  invert: false,
  tag: undefined,
};

export default Heading;
