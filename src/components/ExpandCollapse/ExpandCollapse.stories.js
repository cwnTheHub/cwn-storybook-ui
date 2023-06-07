import React from "react";
import Box from "../../core/core-box/Box";
import { ExpandCollapse } from "../../core/core-expand-collapse";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Expand Collapse / ExpandCollapse",
  component: ExpandCollapse,
};

const Template = (args) => {
  return (
    <ExpandCollapse {...args}>
      <ExpandCollapse.Panel id="features" header="Features">
        <Box between={3}>
          <Box between={2}>
            <Heading level="h4">Connected GPS</Heading>
            <Paragraph size="medium">
              Connect to your phones GPS to see real-time run stats.
            </Paragraph>
          </Box>

          <Box between={2}>
            <Heading level="h4">Notifications</Heading>
            <Paragraph size="medium">
              See call, text and calendar alerts on your wrist.
            </Paragraph>
          </Box>
        </Box>
      </ExpandCollapse.Panel>
    </ExpandCollapse>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  tag: "h2",
};
