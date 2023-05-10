import React from "react";
import Box from "../../core/core-box/Box";
import Text from "../../core/core-text/Text";
import Tooltip from "../../core/core-tooltip/Tooltip";

export default {
  title: "Forms/Tooltip",
  component: Tooltip,
};

const Template = (args) => {
  return (
    <div>
      <Box between={2} inline>
        <Text>Here is the all-new quadcopter</Text>
        <Tooltip
          copy={args.copy}
          direction={args.direction}
          tooltipId={args.tooltipId}
          connectedFieldLabel={args.connectedFieldLabel}
          content={args.content}
        >
          A quadcoptor is a flying drone with 4 propellors.
        </Tooltip>
      </Box>
    </div>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  tooltipId: "jfkhdf",
  copy: "en",
  direction: "auto",
  content:"This is a tooltip"
};
