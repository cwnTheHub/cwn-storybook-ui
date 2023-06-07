import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { componentWithName, htmlElement, or } from "../../util-prop-types";
import { safeRest } from "../../util-helpers";
import { CaretDown, CaretUp, Close } from "../core-interactive-icon";
import {
  helveticaNeueRoman55,
  medium,
} from "../../shared-typography/typography";
import {
  colorGreyAthens,
  colorPrimary,
  colorSecondary,
  colorWhite,
} from "../core-colours/colours";
import { warn } from "../../utils/warn";
import Box from "../core-box/Box";
import { withFocusTrap } from "../../shared-hocs";
import { media, useResponsiveProp } from "../core-responsive";
import NavigationItem from "./NavigationItem";
import ListBox from "./ListBox";
import FlexGrid from "../core-flex-grid/FlexGrid";
import { buttons } from "../../shared-styles";
import Text from "../core-text/Text";
import ChevronLink from "../core-chevron-link/ChevronLink";
import Link from "../core-link/Link";
import Paragraph from "../core-paragraph/Paragraph";
import { getBottomItems } from "./collapseItems";
import BottomSubNavMenu from "./BottomSubNavMenu";

const base = {
  display: "inline-block",
  textDecoration: "none",
  maxWidth: "100%",
  verticalAlign: "bottom",
};
const maxWidth = 289;

const variantDict = {
  primary: "default",
  secondary: "alternative",
  inverted: "inverted",
};

const StyledNavigationSubMenu = styled.a(
  medium,
  helveticaNeueRoman55,
  base,
  ({ variant }) => {
    let color;
    if (variant === "secondary") {
      color = colorSecondary;
    } else if (variant === "inverted") {
      color = colorWhite;
    } else {
      color = colorPrimary;
    }

    return {
      "&:link,&:visited": {
        color,
      },
    };
  }
);

const ItemContainer = styled.div(
  {
    position: "absolute",
    width: maxWidth,
    height: "auto",
    maxHeight: 0,
    display: "block",
    boxSizing: "border-box",
    backgroundColor: colorGreyAthens,
    boxShadow: "0 0 16px 0 rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "max-height 150ms ease-out",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
    zIndex: 1600,
    ...media.from("md").css({
      top: "auto",
      height: "auto",
      maxHeight: "auto",
    }),
    ...media.from("xs").until("md").css({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
      maxHeight: "auto",
    }),
  },
  ({ isVisible }) => ({
    visibility: isVisible ? "visible" : "hidden",
  }),
  ({ isOpen, dropdownRight }) => {
    if (isOpen) {
      return {
        ...media.from("md").css({
          right: dropdownRight && 0,
        }),
        maxHeight: "100vh",
        transform: "translateY(0%)",
        transition: "max-height 500ms ease-in",
      };
    }
    return {
      ...media.from("md").css({
        right: dropdownRight && 0,
      }),
    };
  }
);

const BottomItemContainer = styled(Box)({
  zIndex: 2000,
  display: "none",

  ...media.from("xs").until("md").css({
    display: "flex",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxHeight: "auto",
  }),
});

const StyledChevron = styled.span(({}) => ({
  display: "inline-block",
}));

const getIcon = (isOpen, variant) => (
  <StyledChevron>
    {isOpen ? (
      <CaretUp size={16} variant={variant} />
    ) : (
      <CaretDown size={16} variant={variant} />
    )}
  </StyledChevron>
);

const FocusTrap = withFocusTrap("div");

const NavigationSubMenu = forwardRef(
  (
    {
      reactRouterLinkComponent,
      variant,
      isOpen = false,
      children,
      id,
      selectedId,
      items = [],
      onClick,
      label,
      dropdownRight,

      ...rest
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const footnoteRef = useRef(null);
    const headingRef = useRef(null);

    const bottomItems = useResponsiveProp({
      xs: getBottomItems(items)[0]?.items,
    });

    const clickSubMenu = useCallback(
      (e, options) => {
        onClick(e, options);
      },
      [onClick]
    );

    console.log("bottom items", bottomItems);

    const preventDefault = (e) => {
      if (!bodyRef.current.contains(e.touches[0].target)) {
        e.preventDefault();
      }
    };

    const handleClose = useCallback(
      (e) => {
        if (e.type === "keydown") {
          const key = e.keyCode || e.key;
          if (key === "Escape" || key === 27) {
            clickSubMenu(e, { returnFocus: true });
          }
        } else if (
          e.type === "click" &&
          footnoteRef &&
          e.target &&
          !footnoteRef.current.contains(e.target) &&
          e.target.getAttribute("data-tds-id") !== "footnote-link"
        ) {
          //setIsOpen(false);
          clickSubMenu(e, { returnFocus: false });
        } else if (
          e.type === "touchstart" &&
          footnoteRef &&
          e.touches[0].target &&
          !footnoteRef.current.contains(e.touches[0].target) &&
          e.touches[0].target.getAttribute("data-tds-id") !== "footnote-link"
        ) {
          // setIsOpen(false);
          clickSubMenu(e, { returnFocus: false });
        }
      },
      [clickSubMenu]
    );

    const focusHeading = () => {
      if (isVisible && headingRef && headingRef.current !== null) {
        headingRef.current.focus();
      }
    };

    const handleStyledFootnoteTransitionEnd = (e) => {
      if (e.propertyName === "transform" && !isOpen) {
        setIsVisible(false);
      } else {
        focusHeading();
      }
    };

    if (
      (reactRouterLinkComponent || rest.to) &&
      !(reactRouterLinkComponent && rest.to)
    ) {
      warn(
        "Chevron Link",
        "The props `reactRouterLinkComponent` and `to` must be used together."
      );
    }

    const handleClick = (event) => {
      if (typeof onClick === "function") onClick(event, {});
    };

    // add listeners for mouse clicks outside of Footnote and for ESCAPE key presses
    useEffect(() => {
      if (isOpen) {
        setIsVisible(true);
        window.addEventListener("click", handleClose);
        window.addEventListener("keydown", handleClose);
        window.addEventListener("touchstart", handleClose);
        window.addEventListener("touchmove", preventDefault, {
          passive: false,
        });
      }
      return () => {
        if (isOpen) {
          window.removeEventListener("click", handleClose);
          window.removeEventListener("keydown", handleClose);
          window.removeEventListener("touchstart", handleClose);
          window.removeEventListener("touchmove", preventDefault);
        }
      };
    }, [handleClose, isOpen]);

    const iconVariant = variantDict[variant];
    const StyledClickable = styled.button(buttons.noStyle, ({}) => ({
      display: "none",
      ...media.from("xs").until("md").css({
        display: "flex",
      }),
    }));

    const innerLink = (
      <Box tag="span" inline between={2}>
        <span>{children}</span>
        {getIcon(isOpen, iconVariant)}
      </Box>
    );

    return (
      <div
        ref={footnoteRef}
        style={{
          maxWidth: 289,
          position: "relative",
        }}
      >
        <StyledNavigationSubMenu
          {...safeRest(rest)}
          as={reactRouterLinkComponent || "a"}
          variant={variant}
          onClick={handleClick}
          id={id}
        >
          {innerLink}
        </StyledNavigationSubMenu>
        <ItemContainer
          ref={headingRef}
          isOpen={isOpen}
          isVisible={isVisible}
          onTransitionEnd={handleStyledFootnoteTransitionEnd}
          dropdownRight={dropdownRight}
        >
          <FocusTrap autofocus={false}>
            <Box inset={3} between={3} ref={ref}>
              <FlexGrid.Row horizontalAlign="end">
                <StyledClickable
                  type="button"
                  onClick={(e) => {
                    clickSubMenu(e, { returnFocus: true });
                  }}
                >
                  <Close />
                </StyledClickable>
              </FlexGrid.Row>
              <FlexGrid>
                {items?.map(
                  (
                    {
                      href,
                      label,
                      id,
                      onClick,
                      ref: itemRef,
                      to,
                      items: nestedItems,
                      onChange = () => {},
                      ...itemRest
                    },
                    index
                  ) => {
                    const NavItem = nestedItems ? ListBox : NavigationItem;

                    return (
                      <FlexGrid.Row horizontalAlign="start" key={id}>
                        <Box inset={2}>
                          <NavItem
                            ref={itemRef}
                            key={id}
                            href={href}
                            selectedId={selectedId}
                            index={index}
                            to={to}
                            items={nestedItems}
                            {...itemRest}
                          >
                            {label}
                          </NavItem>
                        </Box>
                      </FlexGrid.Row>
                    );
                  }
                )}
              </FlexGrid>

              <BottomItemContainer>
                <FlexGrid.Row horizontalAlign="center">
                  <FlexGrid.Col>
                    <FlexGrid.Row horizontalAlign="center">
                      {bottomItems?.map(
                        (
                          {
                            href,
                            label,
                            id,
                            onClick,
                            ref: itemRef,
                            to,
                            items: nestedItems,
                            ...itemRest
                          },
                          index
                        ) => {
                          if (!href?.includes("login")) {
                            const NavBottomItem = nestedItems
                              ? BottomSubNavMenu
                              : NavigationItem;
                            return (
                              <FlexGrid.Col key={id} >
                                <Box vertical={3}>
                                    <NavBottomItem
                                      ref={itemRef}
                                      key={id}
                                      href={href}
                                      selectedId={selectedId}
                                      index={index}
                                      to={to}
                                      items={nestedItems}
                                      //{...itemRest}
                                    >
                                      {label}
                                    </NavBottomItem>
                                </Box>
                              </FlexGrid.Col>
                            );
                          }
                        }
                      )}
                    </FlexGrid.Row>
                  </FlexGrid.Col>
                  <FlexGrid.Col xs={0} sm={0} md={0} xl={0}>
                    <Box vertical={2}>
                      <Text>2</Text>
                    </Box>
                  </FlexGrid.Col>
                  <FlexGrid.Col>
                    <Box vertical={3}>
                      {bottomItems?.map(
                        (
                          {
                            href,
                            label,
                            id,
                            onClick,
                            ref: itemRef,
                            to,
                            items: nestedItems,
                            ...itemRest
                          },
                          index
                        ) => {
                          if (href?.includes("/login")) {
                            return (
                              <Paragraph size="medium" key={id}>
                                <ChevronLink to={to} {...itemRest}>
                                  {label}
                                </ChevronLink>
                              </Paragraph>
                            );
                          }
                        }
                      )}
                    </Box>
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </BottomItemContainer>
            </Box>
          </FocusTrap>
        </ItemContainer>
      </div>
    );
  }
);

NavigationSubMenu.displayName = "NavigationSubMenu";

NavigationSubMenu.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "inverted"]),
  reactRouterLinkComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  children: or([
    PropTypes.string,
    componentWithName("A11yContent"),
    htmlElement("span"),
  ]).isRequired,

  id: PropTypes.string,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  selectedId: PropTypes.string,
  items: PropTypes.array,

  dropdownRight: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
NavigationSubMenu.defaultProps = {
  variant: "primary",
  reactRouterLinkComponent: null,
  to: null,
  href: null,
};

export default NavigationSubMenu;
