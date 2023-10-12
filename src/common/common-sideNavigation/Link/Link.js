import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Text from "../../../core/core-text/Text";
import { safeRest } from "../../../util-helpers";
import {
  colorWhiteLilac,
  colorNemetonPurple,
  colorShuttleGrey,
} from "../../../core/core-colours/colours";
import { warn } from "../../../utils/warn";
import ColoredTextProvider from "../../../utils/components/ColoredTextProvider/ColoredTextProvider";
import Box from "../../../core/core-box/Box";


const activeContainer = {
  borderLeft: `4px solid ${colorNemetonPurple}`,
  color: `${colorNemetonPurple}`,
  backgroundColor: `${colorWhiteLilac}`,
};

const activeText = {
  fontWeight: "bold",
  color: `${colorNemetonPurple}`,
};

const hover = {
  color: `${colorShuttleGrey}`,
  "&:hover": {
    color: `${colorNemetonPurple}`,
  },
};

const BoxContainer = styled(Box)((props) => ({
  "&:hover": {
    backgroundColor: `${colorWhiteLilac}`,
  },
  marginLeft: props.submenulink ? "1rem" : "0",
  borderLeft: props.submenulink ? `4px solid ${colorWhiteLilac}` : "none",
  ...(props.active && !props.submenulink ? activeContainer : undefined),
}));

const BoxWrapper = styled(Box)((props) => ({
  backgroundColor: props.active ? `${colorWhiteLilac}` : "none",
}));

const BoxActive = styled(Box)((props) => ({
  borderLeft:
    props.active && props.submenulink
      ? `4px solid ${colorNemetonPurple}`
      : "none",
  marginLeft: props.submenulink ? "-0.25rem" : "0px",
}));

const StyledTextProvider = styled(ColoredTextProvider)((props) => ({
  ...(props.active ? activeText : hover),
}));

const StyledAnchor = styled.a({
  textDecoration: "none",
});

const Link = ({
  reactRouterLinkComponent,
  children,
  active,
  subMenuLink,
  ...rest
}) => {
  if (
    (reactRouterLinkComponent || rest.to) &&
    !(reactRouterLinkComponent && rest.to)
  ) {
    warn(
      "Link",
      "The props `reactRouterLinkComponent` and `to` must be used together."
    );
  }

  const innerLink = (
    <BoxWrapper active={active ? 1 : 0}>
      <BoxContainer
        vertical={3}
        submenulink={subMenuLink ? 1 : 0}
        active={active ? 1 : 0}
      >
        <BoxActive
          active={active ? 1 : 0}
          horizontal={3}
          submenulink={subMenuLink ? 1 : 0}
        >
          <StyledTextProvider active={active}>
            <Text size={subMenuLink ? "small" : "medium"} bold={active}>
              {children}
            </Text>
          </StyledTextProvider>
        </BoxActive>
      </BoxContainer>
    </BoxWrapper>
  );

  return React.createElement(
    reactRouterLinkComponent || StyledAnchor,
    {
      ...safeRest(rest),
    },
    innerLink
  );
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  active: PropTypes.bool,
  subMenuLink: PropTypes.bool,
  reactRouterLinkComponent: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Link.defaultProps = {
  href: undefined,
  active: false,
  subMenuLink: false,
  reactRouterLinkComponent: null,
  to: null,
};

export default Link;
