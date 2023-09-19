import React from "react";
import Box from "../../core/core-box/Box";
import { ExpandCollapse } from "../../core/core-expand-collapse";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Core components/Expand Collapse / ExpandCollapse",
  component: ExpandCollapse,
};

const Template = (args) => {
  return (
    <ExpandCollapse {...args}>
      <ExpandCollapse.Panel id="header" header="Collapse menu header" {...args}>
        <Box between={2}>
          <Box between={2}>
            <Heading level="h4">SubHeading 1</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>

          <Box between={2}>
            <Heading level="h4">Notifications</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>
        </Box>
      </ExpandCollapse.Panel>
      <ExpandCollapse.Panel
        id="specs"
        header="Collapse menu header 2"
        {...args}
      >
        <Box between={3}>
          <Box between={2}>
            <Heading level="h4">Display</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>

          <Box between={2}>
            <Heading level="h4">Other display</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>
        </Box>
      </ExpandCollapse.Panel>
    </ExpandCollapse>
  );
};

const TemplateWithHeader = (args) => {
  return (
    <div>
      <Heading level="h2">New Charges</Heading>
      {Template(args)}
    </div>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  tag: "h2",
};

export const WithCompactProp = Template.bind({});
WithCompactProp.args = {
  tag: "h2",
  compact: true,
};
export const WithSectionTitleAndCompactProp = TemplateWithHeader.bind({});
WithSectionTitleAndCompactProp.args = {
  tag: "h2",
  compact: true,
  topDivider: false,
  subtext: "subTxt 1- subTxt 2",
  tertiaryText: "10",
};
