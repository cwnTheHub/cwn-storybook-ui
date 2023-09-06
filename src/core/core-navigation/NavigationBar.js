import React, { forwardRef, useEffect, useRef, useState } from "react";
import { componentWithName } from "../../util-prop-types";
import Box from "../core-box/Box";
import collapseItems, { collapseFromMdItems } from "./collapseItems";
import NavigationItem from "./NavigationItem";
import PropTypes from "prop-types";
import NavigationSubMenu from "./NavigationSubMenu";
import { media, useResponsiveProp } from "../core-responsive";
import Heading from "../core-heading/Heading";
import FlexGrid from "../core-flex-grid/FlexGrid";
import { borders } from "../../shared-styles";
import styled from "styled-components";

const BoxSize = styled(Box)({
  ...media.from("md").css({
    minWidth: 120,

    ...borders.none,
  }),
});
const NavBar = styled(Box)({
  width: "100%",
  boxSizing: "border-box",
  ...media.from("md").css({
    ...borders.thin,
    ...borders.rounded,
  }),
});

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
      md: items,
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
      <NavBar>
        <FlexGrid gutter={false} limitWidth={false}>
          <FlexGrid.Row verticalAlign={"middle"}>
            <FlexGrid.Col md={2} xs={8} lg={6} horizontalAlign="left">
              {heading && <Heading level={headingLevel}>{heading}</Heading>}
            </FlexGrid.Col>
            <FlexGrid.Col md={10} xs={4} lg={6}>
              <FlexGrid gutter={false} limitWidth={false}>
                <FlexGrid.Row horizontalAlign="end">
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
                        <FlexGrid.Col key={itemId} md={2}>
                          <BoxSize key={itemId} inset={2}>
                            <FlexGrid gutter={false} limitWidth={false}>
                              <FlexGrid.Row horizontalAlign="center">
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
                                  {...(nestedItems &&
                                    isOpen && { openOverlayRef })}
                                >
                                  {label}
                                </ItemComponent>
                              </FlexGrid.Row>
                            </FlexGrid>
                          </BoxSize>
                        </FlexGrid.Col>
                      );
                    }
                  )}
                </FlexGrid.Row>
              </FlexGrid>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </NavBar>
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
