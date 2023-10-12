import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import DecorativeIcon from "../../../core/core-decorative-icon";
import Box from "../../../core/core-box/Box";
import Text from "../../../core/core-text/Text";
import { safeRest } from "../../../util-helpers";
import { FadeAndReveal } from "../../../shared-animation";
import { componentWithName } from "../../../util-prop-types";
import {
  colorNemetonPurple,
  colorWhiteLilac,
  colorShuttleGrey,
} from "../../../core/core-colours/colours";
import { fontNemeton } from "../../../shared-typography/typography";

import ColoredTextProvider from "../../../utils/components/ColoredTextProvider/ColoredTextProvider";
import { CaretDown, CaretUp } from "../../../core/core-interactive-icon";

const SubMenuContainer = styled.ul({
  marginBottom: "1rem",
});

const ButtonSubMenu = styled.button((props) => ({
  backgroundColor: "white",
  border: "none",
  width: "100%",
  color:
    props.active && !props.isOpen
      ? `${colorNemetonPurple}`
      : `${colorShuttleGrey}`,
  borderLeft:
    props.active && !props.isOpen ? `4px solid ${colorNemetonPurple}` : "none",
  fontFamily: `${fontNemeton}`,
  "&:hover": {
    backgroundColor: `${colorWhiteLilac}`,
    color: `${colorNemetonPurple}`,
    cursor: "pointer",
  },
}));

const SpaceBox = styled(Box)({
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "left",
  display: "flex",
});

/**
 * Expandable content areas for use with the `SideNavigation`
 *
 * _This component can only be accessed as a name-spaced component: `SideNavigation.SubMenu`._
 */
class SubMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMenuHeight: 0,
      active: undefined,
    };

    this.subMenu = null;
  }

  componentDidMount() {
    this.checkActiveChildren();
  }

  componentDidUpdate() {
    this.adjustHeight();
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    this.props.handleToggleSubMenu(this.props.id);
  };

  adjustHeight = () => {
    if (this.subMenu.offsetHeight !== this.state.subMenuHeight) {
      this.setState({ subMenuHeight: this.subMenu.offsetHeight });
    }
  };

  checkActiveChildren = () => {
    React.Children.map(this.props.children, (child) => {
      if (child.props.active) {
        this.setState({ active: true });
        this.props.handleToggleSubMenu(this.props.id);
      }
    });
  };

  options = {
    subMenuLink: true,
  };

  render() {
    const { children, label, isOpen, onOpen, onExit, ...rest } = this.props;

    const activeChild = this.state.active;
    return (
      <React.Fragment>
        <ButtonSubMenu
          {...safeRest(rest)}
          onClick={this.handleClick}
          active={activeChild}
          aria-expanded={isOpen}
          isOpen={isOpen}
        >
          <SpaceBox vertical={3} inline horizontal={2}>
            <ColoredTextProvider>
              <Text size="medium" bold={activeChild}>
                {label}
              </Text>
            </ColoredTextProvider>
            {isOpen ? (
              <CaretUp  size={16} />
            ) : (
              <CaretDown  size={16} />
            )}
          </SpaceBox>
        </ButtonSubMenu>
        <FadeAndReveal
          timeout={isOpen ? 500 : 0}
          duration={500}
          in={isOpen}
          height={this.state.subMenuHeight}
          onEntered={onOpen}
          onExited={onExit}
        >
          {() => (
            <SubMenuContainer
              ref={(c) => {
                this.subMenu = c;
              }}
            >
              {React.Children.map(children, (child) => (
                <>{React.cloneElement(child, this.options)}</>
              ))}
            </SubMenuContainer>
          )}
        </FadeAndReveal>
      </React.Fragment>
    );
  }
}

SubMenu.propTypes = {
  children: componentWithName("Link"),
  label: PropTypes.string.isRequired,
  handleToggleSubMenu: PropTypes.func,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
  onExit: PropTypes.func,
};

SubMenu.defaultProps = {
  handleToggleSubMenu: undefined,
  isOpen: false,
  children: undefined,
  id: undefined,
  onClick: undefined,
  onOpen: undefined,
  onExit: undefined,
};

export default SubMenu;
