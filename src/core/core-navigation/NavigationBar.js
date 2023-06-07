import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  generateResponsiveStyles,
  handleResponsiveStyles,
} from "../../util-helpers";
import { componentWithName } from "../../util-prop-types";
import Box from "../core-box/Box";
import collapseItems from "./collapseItems";
import NavigationItem from "./NavigationItem";
import PropTypes from "prop-types";
import NavigationSubMenu from "./NavigationSubMenu";
import { breakpoints, media, useResponsiveProp } from "../core-responsive";
import Heading from "../core-heading/Heading";
import FlexGrid from "../core-flex-grid/FlexGrid";
import HairlineDivider from "../core-hairline-divider/HairlineDivider";

const NavigationBar = forwardRef(
  (
    {
      items,
      onChange = () => {},
      selectedId,
      heading,
      headingLevel = "h1",
      ...rest
    },
    ref
  ) => {
    const openOverlayRef = useRef(null);
    const [openSubMenuId, setOpenSubMenuId] = useState(null);

    const itemsForViewport = useResponsiveProp({
      xs: collapseItems(items, selectedId),
      lg: items,
    });

    const handleSubMenuClose = (event) => {
      if (event.type === "keydown") {
        if (event.key === "Escape" || event.key === 27) {
          setOpenSubMenuId(null);
        }
      } else if (
        event.type === "click" &&
        openOverlayRef?.current &&
        event.target &&
        !openOverlayRef?.current?.contains(event.target)
      ) {
        setOpenSubMenuId(null);
      } else if (
        event.type === "touchstart" &&
        openOverlayRef?.current &&
        event.touches[0].target &&
        !openOverlayRef?.current?.contains(event.touches[0].target)
      ) {
        setOpenSubMenuId(null);
      }
    };

    useEffect(() => {
      if (openSubMenuId !== null) {
        window.addEventListener("click", handleSubMenuClose);
        window.addEventListener("keydown", handleSubMenuClose);
        window.addEventListener("touchstart", handleSubMenuClose);
      }
      return () => {
        if (openSubMenuId !== null) {
          window.removeEventListener("click", handleSubMenuClose);
          window.removeEventListener("keydown", handleSubMenuClose);
          window.removeEventListener("touchstart", handleSubMenuClose);
        }
      };
    }, [openSubMenuId]);

    return (
      <FlexGrid>
        <FlexGrid.Row verticalAlign="bottom" distribute="between">
          <FlexGrid.Col md={4} horizontalAlign="left">
            {heading && <Heading level={headingLevel}>{heading}</Heading>}
          </FlexGrid.Col>
          <FlexGrid.Col>
            <FlexGrid.Row horizontalAlign="end">
              <Box inline between={3}>
                {itemsForViewport?.map(
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
                    const itemId = id ?? label;
                    const handleClick = (event) => {
                      if (nestedItems) {
                        setOpenSubMenuId(
                          openSubMenuId !== itemId ? itemId : null
                        );
                      }
                      onClick?.(event);
                      onChange?.(itemId, event);
                    };

                    const ItemComponent = nestedItems
                      ? NavigationSubMenu
                      : NavigationItem;
                    const isOpen = itemId === openSubMenuId;

                    return (
                      <ItemComponent
                        key={itemId}
                        ref={itemRef}
                        href={href}
                        onClick={handleClick}
                        // TODO: refactor to pass selected ID via context
                        selectedId={selectedId}
                        index={index}
                        to={to}
                        items={nestedItems}
                        selected={itemId === selectedId}
                        {...itemRest}
                        {...(nestedItems && { isOpen })}
                        {...(nestedItems && isOpen && { openOverlayRef })}
                      >
                        {label}
                      </ItemComponent>
                    );
                  }
                )}
              </Box>
            </FlexGrid.Row>
          </FlexGrid.Col>
        </FlexGrid.Row>
        <HairlineDivider />
      </FlexGrid>
    );
  }
);
NavigationBar.displayName = "NavigationBar";

NavigationBar.propTypes = {
  heading: PropTypes.string,
  headingLevel: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),

  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      id: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      selected: PropTypes.bool,
      reactRouterLinkComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ]),
      to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      invert: PropTypes.bool,
      children: PropTypes.node.isRequired,
      forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
      icon: componentWithName("Dependent", true),
      iconPosition: PropTypes.oneOf(["left", "right"]),

      // One layer of nested links is allowed
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string,
          id: PropTypes.string.isRequired,
          onClick: PropTypes.func,
          selected: PropTypes.bool,
          reactRouterLinkComponent: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object,
          ]),
          to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
          invert: PropTypes.bool,
          children: PropTypes.node.isRequired,
          forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
          icon: componentWithName("Dependent", true),
          iconPosition: PropTypes.oneOf(["left", "right"]),
        })
      ),
    })
  ).isRequired,
  selectedId: PropTypes.string.isRequired,
  /**
   * Optional function to be called on pressing a link
   */
  onChange: PropTypes.func,
};
NavigationBar.defaultProps = {
  heading: undefined,
  headingLevel: "h1",
  onChange: () => {},
};

export default NavigationBar;
