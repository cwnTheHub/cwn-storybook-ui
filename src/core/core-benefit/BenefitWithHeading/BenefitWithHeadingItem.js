import React from "react";
import PropTypes from "prop-types";
import Box from "../../core-box/Box";
import { safeRest } from "../../../util-helpers";
import { componentWithName } from "../../../util-prop-types";
import Text from "../../core-text/Text";
import { warn } from "../../../utils/warn";
import Heading from "../../core-heading/Heading";

const BenefitItem = ({ icon: Icon, heading, children, ...rest }) => {
  if (Icon === undefined || typeof Icon === "undefined") {
    warn(
      "BenefitWitHeading",
      "An icon must be set in either BenefitWithHeading or BenefitWithHeading.Item."
    );
  }

  return (
    <Box {...safeRest(rest)} between={3} inline tag="li">
      {Icon && (
        <Box vertical={1}>
          <Icon size={24} variant="default" />
        </Box>
      )}
      <div>
        <Heading level="h4" tag="div">
          {heading}
        </Heading>
        <Text size="small">{children}</Text>
      </div>
    </Box>
  );
};

BenefitItem.propTypes = {
  icon: componentWithName("DecorativeIcon", true),
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

BenefitItem.defaultProps = {
  icon: undefined,
};

BenefitItem.displayName = "BenefitWithHeading.Item";

export default BenefitItem;
