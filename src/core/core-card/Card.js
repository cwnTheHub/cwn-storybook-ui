import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Box from "../core-box/Box";
import Image from "../core-image/Image";
import { responsiveProps } from "../../util-prop-types";
import {
  colorWhite,
  colorWhiteLilac,
  colorGreyAthens,
  colorGreyGainsboro,
} from "../core-colours/colours";
import { handleResponsiveStyles, safeRest } from "../../util-helpers";
import { borders } from "../../shared-styles";
import { deprecate } from "../../utils/warn";

const getVariant = ({ variant }) => {
  if (
    ["white", "default", "defaultWithBorder", "defaultOnlyBorder"].indexOf(
      variant
    ) >= 0
  ) {
    return {
      boxShadow:
        variant === "defaultOnlyBorder"
          ? undefined
          : "0 0 16px 0 rgba(0, 0, 0, 0.1)",
      backgroundColor: colorWhite,
      border:
        variant === "defaultWithBorder" || variant === "defaultOnlyBorder"
          ? `1px solid ${colorGreyGainsboro}`
          : undefined,
    };
  }
  if (variant === "lavender" || variant === "branded") {
    return {
      backgroundColor: colorWhiteLilac,
    };
  }
  return { backgroundColor: colorGreyAthens };
};

const deprecationWarning = (deprecatedVariant) => {
  const variants = {
    white: "default",
    lavendar: "branded",
    grey: "alternative",
  };
  return `The ${deprecatedVariant} variant has been deprecated. Please use the '${variants[deprecatedVariant]}' variant.`;
};

export const StyledCard = styled(({ fullHeight, ...props }) => (
  <Box {...props} />
))(borders.none, borders.rounded, getVariant, ({ fullHeight }) => {
  if (fullHeight) {
    return { height: "100%" };
  }
  return {};
});

const fullBleedImageStyles = (fullBleedImage) =>
  fullBleedImage &&
  fullBleedImage.position &&
  handleResponsiveStyles(
    { position: fullBleedImage.position },
    ({ position }) => {
      if (!fullBleedImage) return {};
      const direction = {
        left: "row",
        right: "row-reverse",
        top: "column",
        bottom: "column-reverse",
        none: "row",
      };
      const styles = {
        display: "flex",
        flexDirection: direction[position],
        justifyContent: "space-between",
        "> img": {
          display: position === "none" ? "none" : "block",
          margin: "auto",
        },
      };
      return styles;
    }
  );

const StyledImageCard = styled(({ fullBleedImage, ...props }) => (
  <div {...props} />
))(({ fullBleedImage }) => fullBleedImageStyles(fullBleedImage));

const Card = ({
  variant,
  children,
  fullHeight,
  spacing,
  fullBleedImage,
  ...rest
}) => {
  if (variant === "white" || variant === "lavendar" || variant === "grey") {
    deprecate("core-card", deprecationWarning(variant));
  }

  const spacingProps = {};
  if (spacing === "default") {
    spacingProps.vertical = 5;
    spacingProps.horizontal = 4;
  } else if (spacing === "narrow") {
    spacingProps.vertical = 4;
    spacingProps.horizontal = 3;
  } else if (spacing === "compact") {
    spacingProps.inset = 3;
  } else if (spacing === "intermediate") {
    spacingProps.inset = 4;
  }

  if (fullBleedImage) {
    return (
      <StyledCard {...safeRest(rest)} fullHeight={fullHeight} variant={variant}>
        <StyledImageCard fullBleedImage={fullBleedImage}>
          <Image
            src={fullBleedImage.src}
            width={fullBleedImage.width}
            height={fullBleedImage.height}
            alt={fullBleedImage.alt}
          />
          <Box {...spacingProps}>{children}</Box>
        </StyledImageCard>
      </StyledCard>
    );
  }

  return (
    <StyledCard
      {...safeRest(rest)}
      fullHeight={fullHeight}
      variant={variant}
      {...spacingProps}
    >
      {children}
    </StyledCard>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf([
    "white",
    "lavender",
    "grey",
    "default",
    "branded",
    "alternative",
    "defaultWithBorder",
    "defaultOnlyBorder",
  ]),
  children: PropTypes.node.isRequired,
  fullHeight: PropTypes.bool,
  spacing: PropTypes.oneOf(["default", "narrow", "compact", "intermediate"]),
  fullBleedImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string.isRequired,
    position: responsiveProps(
      PropTypes.oneOf(["left", "right", "top", "bottom", "none"])
    ).isRequired,
  }),
};

Card.defaultProps = {
  variant: "default",
  fullHeight: false,
  spacing: "default",
  fullBleedImage: undefined,
};

export default Card;
