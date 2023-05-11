import React from "react";
import PropTypes from "prop-types";
import { warn } from "../../../utils/warn";
import { safeRest } from "../../../util-helpers";
import Text from "../../core-text/Text";
import Box from "../../core-box/Box";
import { componentWithName } from "../../../util-prop-types";

const BenefitItem = ({ icon: Icon, children, ...rest }) => {
  if (Icon === undefined || typeof Icon === "undefined") {
    warn(
      "BenefitNoHeading",
      "An icon must be set in either BenefitNoHeading or BenefitNoHeading.Item."
    );
  }

  return (
    <Box {...safeRest(rest)} between={3} inline tag="li">
      {Icon && <Icon size={24} variant="default" />}
      <Text size="small">{children}</Text>
    </Box>
  );
};

BenefitItem.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  children: PropTypes.node.isRequired,
};

BenefitItem.defaultProps = {
  icon: undefined,
};

BenefitItem.displayName = "BenefitNoHeading.Item";

export default BenefitItem;
