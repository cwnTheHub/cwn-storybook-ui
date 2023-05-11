import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import OrderedItem, { StyledOrderedItem } from "./OrderedItem/OrderedItem";
import Box from "../core-box/Box";
import { componentWithName } from "../../util-prop-types";
import { list } from "../../shared-styles";
import { safeRest } from "../../util-helpers";

const listStyleType = {
  upperAlpha: "upper-alpha",
  lowerAlpha: "lower-alpha",
  decimal: "decimal",
};

export const StyledOrderedList = styled(({ size, listStyle, ...rest }) => (
  <Box {...rest} />
))(({ listStyle }) => ({
  paddingLeft: "3rem",
  listStyleType: listStyleType[listStyle],
  ...list.base,
}));

const OrderedList = ({ listStyle, size, children, ...rest }) => (
  <StyledOrderedList
    {...safeRest(rest)}
    tag="ol"
    between={2}
    listStyle={listStyle}
  >
    {React.Children.toArray(children)
      .filter((child) => child)
      .map((child) => React.cloneElement(child, { size }))}
  </StyledOrderedList>
);

OrderedList.propTypes = {
  listStyle: PropTypes.oneOf(["decimal", "upperAlpha", "lowerAlpha"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  children: componentWithName("OrderedItem").isRequired,
};

OrderedList.defaultProps = {
  listStyle: "decimal",
  size: "medium",
};

OrderedList.Item = OrderedItem;

export default OrderedList;

export { StyledOrderedItem };
