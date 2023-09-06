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
import { CaretDown, CaretUp } from "../core-interactive-icon";
import {
  helveticaNeueRoman55,
  medium,
} from "../../shared-typography/typography";
import {
  colorGreyAthens,
  colorPrimary,
  colorSecondary,
  colorWhite,
  colorWhiteLilac,
} from "../core-colours/colours";
import { warn } from "../../utils/warn";
import Box from "../core-box/Box";
import { withFocusTrap } from "../../shared-hocs";
import { media } from "../core-responsive";
import NavigationItem from "./NavigationItem";

const base = {
  display: "inline-block",
  textDecoration: "none",
  maxWidth: "100%",
  verticalAlign: "top",
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
    position: "relative",
    width: maxWidth,
    height: "auto",
    maxHeight: 0,
    display: "block",
    backgroundColor: colorGreyAthens,
    boxShadow: "0 0 16px 0 rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "max-height 300ms ease-out",
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
    zIndex: 1600,
    ...media.from("md").css({
      top: "auto",
      height: "auto",
      maxHeight: "auto",
    }),
  },
  ({ isVisible }) => ({
    visibility: isVisible ? "visible" : "hidden",
  }),
  ({ isOpen }) => {
    if (isOpen) {
      return {
        maxHeight: 300,
        transform: "translateY(0%)",
        transition: "max-height 500ms ease-in",
      };
    }
    return {};
  }
);

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

/* const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    if (ref.current) {
      return ref.current;
    }
    return {};
  }; */

const NavigationSubMenu = forwardRef(
  (
    {
      reactRouterLinkComponent,
      variant,
      // isOpen = false,
      children,
      id,
      selectedId,
      items = [],
      //onClick,
      label,

      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const footnoteRef = useRef(null);
    const headingRef = useRef(null);

    //const prevProps = usePrevious({ ...rest });

    console.log("the items submenu", items);

    /* const clickSubMenu = useCallback(
      (e, options) => {
        onClick(e, options);
      },
      [onClick]
    ); */

    const preventDefault = (e) => {
      if (!bodyRef.current?.contains(e.touches[0].target)) {
        e.preventDefault();
      }
    };

    const handleClose = useCallback(
      (e) => {
        if (e.type === "keydown") {
          const key = e.keyCode || e.key;
          if (key === "Escape" || key === 27) {
            setIsOpen(true);
            //clickSubMenu(e, { returnFocus: true });
          }
        } else if (
          e.type === "click" &&
          footnoteRef &&
          e.target &&
          !footnoteRef.current?.contains(e.target) &&
          e.target.getAttribute("data-tds-id") !== "footnote-link"
        ) {
          setIsOpen(false);
          //clickSubMenu(e, { returnFocus: false });
        } else if (
          e.type === "touchstart" &&
          footnoteRef &&
          e.touches[0].target &&
          !footnoteRef?.current?.contains(e.touches[0].target) &&
          e.touches[0].target.getAttribute("data-tds-id") !== "footnote-link"
        ) {
          setIsOpen(false);
          // clickSubMenu(e, { returnFocus: false });
        }
      },
      [setIsOpen] //[ clickSubMenu]
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
      event.stopPropagation();
      setIsOpen(!isOpen);

      //onClick(event, {});
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

    const innerLink = (
      <Box tag="span" inline between={2}>
        <span>{children}</span>
        {getIcon(isOpen, iconVariant)} {/* TODO replace isShown with isOpen */}
      </Box>
    );

    return (
      <>
        <StyledNavigationSubMenu
          {...safeRest(rest)}
          as={reactRouterLinkComponent || "a"}
          variant={variant}
          onClick={handleClick}
          id={id}
        >
          {innerLink}
        </StyledNavigationSubMenu>
        <div
          ref={headingRef}
          style={{
            maxWidth: 289,
            position: "relative",
            maxHeight: "25vh",
          }}
        >
          <ItemContainer
            isOpen={isOpen}
            isVisible={isVisible}
            onTransitionEnd={handleStyledFootnoteTransitionEnd}
          >
            <FocusTrap autofocus={false}>
              <Box vertical between={3} inset={2} ref={ref}>
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
                      ...itemRest
                    },
                    index
                  ) => {
                    const NavItem = nestedItems
                      ? NavigationSubMenu
                      : NavigationItem;
                    return (
                      <NavItem
                        ref={itemRef}
                        key={id}
                        href={href}
                        onClick={handleClick}
                        // TODO: refactor to pass selected ID via context
                        selectedId={selectedId}
                        index={index}
                        to={to}
                        items={nestedItems}
                        // selected={itemId === selectedId}
                      >
                        {label}
                      </NavItem>
                    );
                  }
                )}
              </Box>
            </FocusTrap>
          </ItemContainer>
        </div>
      </>
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

  onClick: PropTypes.func.isRequired,
};
NavigationSubMenu.defaultProps = {
  variant: "primary",
  reactRouterLinkComponent: null,
  to: null,
  href: null,
};

export default NavigationSubMenu;
