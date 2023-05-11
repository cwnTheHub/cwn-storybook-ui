import React from "react";
import { safeRest } from "../../../util-helpers";
import { componentWithName } from "../../../util-prop-types";
import Box from "../../core-box/Box";

import Item from "./BenefitNoHeadingItem";

const cloneChild = (icon, child) => {
  if (child.props.icon) {
    return child;
  }
  return React.cloneElement(child, { icon });
};

const BenefitNoHeading = ({ icon, children, ...rest }) => (
  <Box {...safeRest(rest)} tag="ul" between={3}>
    {React.Children.map(children, (child) => cloneChild(icon, child))}
  </Box>
);

BenefitNoHeading.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  children: componentWithName("BenefitItem").isRequired,
};

BenefitNoHeading.defaultProps = {
  icon: undefined,
};

BenefitNoHeading.Item = Item;

export default BenefitNoHeading;
