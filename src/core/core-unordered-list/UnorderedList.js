import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import UnorderedItem from "./UnorderedItem/UnorderedItem";
import { safeRest } from "../../util-helpers";
import { componentWithName } from "../../util-prop-types";
import { list } from "../../shared-styles";
import Box from "../core-box/Box";

const StyledListContainer = styled(Box)({
  ...list.nestedListSpacing,
  "&": {
    paddingLeft: "calc(2rem + 1px)",
  },
});

const injectListStyle = (child, listStyle, size) =>
  React.cloneElement(child, { listStyle, size });

const UnorderedList = ({ listStyle, size, children, ...rest }) => {
  const filteredChildren = React.Children.toArray(children).filter(
    (child) => child
  );
  return (
    <StyledListContainer {...safeRest(rest)} tag="ul" between={2}>
      {React.Children.map(filteredChildren, (child) =>
        injectListStyle(child, listStyle, size)
      )}
    </StyledListContainer>
  );
};

UnorderedList.propTypes = {
  listStyle: PropTypes.oneOf(["circle", "checkmark", "x"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  children: componentWithName("UnorderedItem").isRequired,
};

UnorderedList.defaultProps = {
  listStyle: "circle",
  size: "medium",
};

UnorderedList.Item = UnorderedItem;

export default UnorderedList;
