import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import GutterContext from "../gutterContext";
import calculateLevel from "../calculateLevel";
import { responsiveProps } from "../../../util-prop-types";
import { media } from "../../core-responsive";
import { safeRest } from "../../../util-helpers";
import { deprecate } from "../../../utils/warn";

const toPercent = (num) => {
  return `${(num / 12) * 100}%`;
};

const calculateWidth = (breakpoint, value) => {
  if (typeof value === "undefined") {
    return {};
  }

  if (typeof value === "number") {
    const percent = toPercent(value);

    return media.from(breakpoint).css({
      maxWidth: percent,
      flexBasis: percent,
    });
  }

  return {
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: "100%",
  };
};

const calculateOffset = (breakpoint, value) => {
  if (typeof value === "number") {
    const percent = toPercent(value);

    return media.from(breakpoint).css({
      marginLeft: percent,
    });
  }
  return {};
};

const sizeStyles = ({ xs, sm, md, lg, xl }) => ({
  flex: "0 0 auto",
  flexBasis: "100%",
  maxWidth: "100%",
  ...calculateWidth("xs", xs),
  ...calculateWidth("sm", sm),
  ...calculateWidth("md", md),
  ...calculateWidth("lg", lg),
  ...calculateWidth("xl", xl),
});

const offsetStyles = ({
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
}) => ({
  ...calculateOffset("xs", xsOffset),
  ...calculateOffset("sm", smOffset),
  ...calculateOffset("md", mdOffset),
  ...calculateOffset("lg", lgOffset),
  ...calculateOffset("xl", xlOffset),
});

export const StyledCol = styled.div(
  sizeStyles,
  offsetStyles,
  ({ hiddenLevel, gutter, horizontalAlignLevel }) => ({
    paddingLeft: gutter ? "1rem" : 0,
    paddingRight: gutter ? "1rem" : 0,
    ...media.until("sm").css({
      display: hiddenLevel[0] === 0 ? "none" : "block",
      textAlign: horizontalAlignLevel[0],
    }),
    ...media.from("sm").css({
      display: hiddenLevel[1] === 0 ? "none" : "block",
      textAlign: horizontalAlignLevel[1],
    }),
    ...media.from("md").css({
      display: hiddenLevel[2] === 0 ? "none" : "block",
      textAlign: horizontalAlignLevel[2],
    }),
    ...media.from("lg").css({
      display: hiddenLevel[3] === 0 ? "none" : "block",
      textAlign: horizontalAlignLevel[3],
    }),
    ...media.from("xl").css({
      display: hiddenLevel[4] === 0 ? "none" : "block",
      textAlign: horizontalAlignLevel[4],
    }),
  })
);

const Col = ({ span, offset, horizontalAlign, children, ...rest }) => {
  if (offset) {
    deprecate(
      "core-flex-grid",
      "The `offset` prop is deprecated due to the addition of the responsive offset props. Use `xsOffset` instead."
    );
  }
  if (span) {
    deprecate(
      "core-flex-grid",
      "The `span` prop is deprecated due to the addition of the responsive props. Use `xs` instead."
    );
  }

  const props = { ...rest };

  if (offset && !props.xsOffset) {
    props.xsOffset = offset;
  }

  const hiddenLevel = calculateLevel(
    rest.xs,
    rest.sm,
    rest.md,
    rest.lg,
    rest.xl
  );

  const horizontalAlignLevel = () => {
    if (typeof horizontalAlign === "object") {
      return calculateLevel(
        horizontalAlign.xs,
        horizontalAlign.sm,
        horizontalAlign.md,
        horizontalAlign.lg,
        horizontalAlign.xl
      );
    }
    if (typeof horizontalAlign === "string") {
      return [
        horizontalAlign,
        horizontalAlign,
        horizontalAlign,
        horizontalAlign,
        horizontalAlign,
      ];
    }
    return ["inherit", "inherit", "inherit", "inherit", "inherit"];
  };

  return (
    <GutterContext.Consumer>
      {(gutter) => (
        <StyledCol
          {...safeRest(props)}
          xs={rest.xs || span || true}
          hiddenLevel={hiddenLevel}
          gutter={gutter}
          horizontalAlignLevel={horizontalAlignLevel()}
        >
          {children}
        </StyledCol>
      )}
    </GutterContext.Consumer>
  );
};

Col.propTypes = {
  xs: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  sm: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  md: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  lg: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  xl: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true, false]),
  xsOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  smOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  mdOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  lgOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  xlOffset: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  children: PropTypes.node.isRequired,
  span: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  offset: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  horizontalAlign: responsiveProps(PropTypes.string),
};

Col.defaultProps = {
  span: undefined,
  offset: undefined,
  horizontalAlign: undefined,
};

export default Col;
