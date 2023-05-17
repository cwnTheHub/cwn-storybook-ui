import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { componentWithName, htmlElement, or } from "../../util-prop-types";
import { StyledButton } from "../core-button/Button";
import { links } from "../../shared-styles";
import { safeRest } from "../../util-helpers";
import {
  colorWhite as buttonTextColor,
  colorPrimary as primaryBgColor,
  colorSecondary as secondaryBgColor,
  colorText,
} from "../core-colours/colours";
import { deprecate, warn } from "../../utils/warn";

const VARIANT_PRIMARY = "primary";
const VARIANT_SECONDARY = "secondary";
const VARIANT_INVERTED = "inverted";
const VARIANT_STANDARD = "standard";
const VARIANT_BRAND = "brand";

const RANK_MAIN = "main";
const RANK_COMMON = "common";

const DEFAULT_VARIANT = VARIANT_PRIMARY;
const VALID_VARIANTS = [
  VARIANT_PRIMARY,
  VARIANT_SECONDARY,
  VARIANT_INVERTED,
  VARIANT_STANDARD,
  VARIANT_BRAND,
];

const getVisitedColor = (variant, rank) => {
  if (variant === VARIANT_PRIMARY || variant === VARIANT_SECONDARY) {
    return buttonTextColor;
  }
  if (variant === VARIANT_STANDARD) {
    return rank === RANK_MAIN ? buttonTextColor : primaryBgColor;
  }
  if (variant === VARIANT_BRAND) {
    return rank === RANK_MAIN ? buttonTextColor : secondaryBgColor;
  }
  return colorText;
};

const getHoverColor = (variant, rank) => {
  if (
    variant === VARIANT_PRIMARY ||
    (variant === VARIANT_STANDARD && rank === RANK_COMMON)
  ) {
    return primaryBgColor;
  }
  if (
    variant === VARIANT_SECONDARY ||
    (variant === VARIANT_BRAND && rank === RANK_COMMON)
  ) {
    return secondaryBgColor;
  }
  return buttonTextColor;
};

const hoverStyles = ({ variant, rank }) => {
  const hoverColor = getHoverColor(variant, rank);
  return {
    "@media(hover: hover)": {
      "&:hover": {
        color: hoverColor,
      },
    },
  };
};

const visitedStyles = ({ variant, rank }) => {
  const color = getVisitedColor(variant, rank);
  return {
    "&:link,&:visited": {
      color,
    },
  };
};

const StyledButtonLink = styled(StyledButton)(
  links.focusOutline,
  {
    textDecoration: "none",
  },
  visitedStyles,
  hoverStyles,
  ({ fullWidth }) => {
    const width = fullWidth ? "100%" : "auto";
    return {
      "&:link,&:visited": {
        width,
      },
    };
  }
);

const isDeprecatedButtonVariant = (variant) => {
  return ["primary", "secondary"].indexOf(variant) !== -1;
};

const validateVariant = (variant) => {
  if (VALID_VARIANTS.indexOf(variant) === -1) {
    return DEFAULT_VARIANT;
  }
  return variant;
};

const ButtonLink = forwardRef(
  (
    { reactRouterLinkComponent, variant, fullWidth, children, ...rest },
    ref
  ) => {
    if (
      (reactRouterLinkComponent || rest.to) &&
      !(reactRouterLinkComponent && rest.to)
    ) {
      warn(
        "Link Button",
        "The props `reactRouterLinkComponent` and `to` must be used together."
      );
    }

    if (isDeprecatedButtonVariant(variant)) {
      deprecate(
        "@nds-core/core-button-link",
        "The 'primary' and 'secondary' variants have been deprecated."
      );
    }

    return (
      <StyledButtonLink
        {...safeRest(rest)}
        as={reactRouterLinkComponent || "a"}
        variant={validateVariant(variant)}
        ref={ref}
        fullWidth={fullWidth}
      >
        {children}
      </StyledButtonLink>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

ButtonLink.propTypes = {
  variant: PropTypes.oneOf(VALID_VARIANTS),
  rank: PropTypes.oneOf(["main", "common"]),
  reactRouterLinkComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
  children: or([
    PropTypes.string,
    componentWithName("A11yContent"),
    htmlElement("span"),
  ]).isRequired,
};
ButtonLink.defaultProps = {
  variant: DEFAULT_VARIANT,
  rank: "common",
  reactRouterLinkComponent: null,
  to: null,
  href: null,
  fullWidth: false,
};

export default ButtonLink;
