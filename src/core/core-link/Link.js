import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  colorGreyShark,
  colorWhite,
  colorGainsboro,
  colorGreyRaven,
} from "../core-colours/colours";
import { links } from "../../shared-styles";
import { safeRest } from "../../util-helpers";
import { componentWithName } from "../../util-prop-types";
import { withForwardedRef } from "../../shared-hocs";
import { warn } from "../../utils/warn";

const base = {
  ...links.focusOutline,
  "&:link,&:visited": {
    color: colorGreyShark,
    textDecoration: "underline",
  },
  "&:hover": {
    textDecoration: "none",
  },
  "& svg": {},
};

const states = ({ invert }) => {
  return {
    "&:active": {
      color: invert && colorGainsboro,
      backgroundColor: invert ? "rgba(0,0,0,0.4)" : colorGainsboro,
      borderRadius: "0.25rem",
      padding: "0.125rem",
      margin: "-0.125rem",
      textDecoration: "underline",
    },
    "&:focus": {
      border: `0.125rem solid ${invert ? colorWhite : colorGreyRaven}`,
      padding: "0.125rem",
      margin: "-0.25rem", // (border + padding) * -1
      borderRadius: "0.25rem",
      outline: "none",
    },
  };
};
const StyledLink = styled.a(
  base,
  {
    "& svg": {
      transition: "transform 150ms ease-in-out",
    },
    "&:hover svg": {
      transform: "scale(1.1, 1.1)",
    },
    "&:active svg": {
      transform: "scale(1, 1)",
    },
  },
  ({ invert, context }) => {
    if (context.inheritColor) {
      return {
        "&:link,&:visited": {
          color: "inherit",
        },
      };
    }
    if (invert) {
      return {
        "&:link,&:visited": {
          color: colorWhite,
        },
      };
    }
    return {};
  },
  states,
  ({ hasIcon }) => {
    if (hasIcon) {
      return {
        display: "inline-block",
        "& > svg": {
          verticalAlign: "middle",
        },
      };
    }
    return {};
  }
);

const Link = (
  {
    reactRouterLinkComponent,
    invert,
    children,
    forwardedRef,
    icon: Icon,
    iconPosition,
    ...rest
  },
  context
) => {
  if (
    !(reactRouterLinkComponent && rest.to) &&
    (reactRouterLinkComponent || rest.to)
  ) {
    warn(
      "Link",
      "The props `reactRouterLinkComponent` and `to` must be used together."
    );
  }

  const renderChildren = useCallback(() => {
    if (Icon) {
      return (
        <>
          {iconPosition === "left" && (
            <Icon
              color={invert ? "white" : "greyShark"}
              style={{ marginRight: "0.5rem" }}
            />
          )}
          {children}
          {iconPosition === "right" && (
            <Icon
              color={invert ? "white" : "greyShark"}
              style={{ marginLeft: "0.25rem" }}
            />
          )}
        </>
      );
    }
    return children;
  }, [children, Icon, iconPosition, invert]);

  return (
    <StyledLink
      {...safeRest(rest)}
      as={reactRouterLinkComponent || "a"}
      invert={invert}
      context={context}
      ref={forwardedRef}
      hasIcon={!!Icon}
    >
      {renderChildren()}
    </StyledLink>
  );
};
Link.propTypes = {
  reactRouterLinkComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  invert: PropTypes.bool,
  children: PropTypes.node.isRequired,
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  icon: componentWithName("Dependent", true),
  iconPosition: PropTypes.oneOf(["left", "right"]),
};
Link.defaultProps = {
  reactRouterLinkComponent: null,
  to: null,
  href: null,
  invert: undefined,
  forwardedRef: undefined,
  icon: undefined,
  iconPosition: "left",
};

Link.contextTypes = {
  inheritColor: PropTypes.bool,
};

export default withForwardedRef(Link);
