import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import responsiveProps from "../../util-prop-types/responsiveProps";
import { handleResponsiveStyles } from "../../util-helpers";

const spacing = {
  mobile: {
    0: "0rem",
    1: "0.25rem",
    2: "0.5rem",
    3: "1rem",
    4: "1.5rem",
    5: "2rem",
    6: "2.5rem",
    7: "3rem",
    8: "4rem",
  },
  desktop: {
    0: "0rem",
    1: "0.25rem",
    2: "0.5rem",
    3: "1rem",
    4: "2rem",
    5: "3rem",
    6: "4rem",
    7: "4.5rem",
    8: "6rem",
  },
};

export const convertToRem = (level, breakpoint) => {
  if (["xs", "sm"].indexOf(breakpoint) !== -1) {
    return spacing.mobile[level];
  }
  return spacing.desktop[level];
};

const inlineBetweenStyles = (props) =>
  handleResponsiveStyles(
    { between: props.between, inline: props.inline },
    ({ between, inline }, breakpoint) => {
      const base = {
        display: between !== undefined ? "flex" : "block",
        flexDirection: inline ? "row" : "column",
      };

      if (between === undefined) {
        return base;
      }

      if (between === "space-between") {
        return Object.assign(base, { justifyContent: "space-between" });
      }

      const rem = convertToRem(between, breakpoint);

      return Object.assign(base, {
        "> *:not(:last-child)": {
          ...(inline ? { marginRight: rem } : { marginBottom: rem }),
        },
      });
    }
  );

const horizontalStyles = (props) =>
  handleResponsiveStyles(
    { horizontal: props.horizontal },
    ({ horizontal }, breakpoint) => {
      if (horizontal === undefined) {
        return undefined;
      }

      const rem = convertToRem(horizontal, breakpoint);

      return { paddingLeft: rem, paddingRight: rem };
    }
  );

const verticalStyles = (props) =>
  handleResponsiveStyles(
    { vertical: props.vertical },
    ({ vertical }, breakpoint) => {
      if (vertical === undefined) {
        return undefined;
      }

      const rem = convertToRem(vertical, breakpoint);

      return { paddingTop: rem, paddingBottom: rem };
    }
  );

const insetStyles = (props) =>
  handleResponsiveStyles({ inset: props.inset }, ({ inset }, breakpoint) => {
    if (inset === undefined) {
      return undefined;
    }

    const rem = convertToRem(inset, breakpoint);

    return {
      paddingTop: rem,
      paddingBottom: rem,
      paddingLeft: rem,
      paddingRight: rem,
    };
  });

const belowStyles = (props) =>
  handleResponsiveStyles({ below: props.below }, ({ below }, breakpoint) => {
    if (below === undefined) {
      return undefined;
    }

    const rem = convertToRem(below, breakpoint);

    return {
      marginBottom: rem,
    };
  });

const StyledBox = styled.div.attrs(({ className, tag }) => {
  return { className, as: tag };
})(
  inlineBetweenStyles,
  horizontalStyles,
  verticalStyles,
  insetStyles,
  belowStyles
);

const Box = forwardRef((props, ref) => <StyledBox {...props} ref={ref} />);
Box.displayName = "Box";

Box.propTypes = {
  tag: PropTypes.string,
  vertical: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  horizontal: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  inset: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  below: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  between: responsiveProps(
    PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, "space-between"])
  ),
  inline: responsiveProps(PropTypes.bool),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  inline: false,
  tag: "div",
  vertical: undefined,
  horizontal: undefined,
  inset: undefined,
  below: undefined,
  between: undefined,
  className: undefined,
};


export default Box;
