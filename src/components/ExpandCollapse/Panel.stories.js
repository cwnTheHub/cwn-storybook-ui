import React from "react";
import Box from "../../core/core-box/Box";
import { ExpandCollapse } from "../../core/core-expand-collapse";
import Panel from "../../core/core-expand-collapse/Panel/Panel";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Expand Collapse / Panel",
  component: Panel,
};

const Template = (args) => {
  return ( 
    <ExpandCollapse {...args}>
      <ExpandCollapse.Panel id="header" header="Collapse menu header" {...args}>
        <Box between={2}>
          <Heading level="h4">SubHeading 1</Heading>
          <Paragraph size="medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Paragraph>
        </Box>
      </ExpandCollapse.Panel>
      <ExpandCollapse.Panel
        id="specs"
        header="Collapse menu header 2"
        {...args}
      >
        <Box between={2}>
          <Heading level="h4">Other display</Heading>
          <Paragraph size="medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Paragraph>
        </Box>
      </ExpandCollapse.Panel>
    </ExpandCollapse>
  );
};


export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  tag: "h2",
};