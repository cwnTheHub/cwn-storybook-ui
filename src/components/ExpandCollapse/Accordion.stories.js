import React from "react";
import Box from "../../core/core-box/Box";
import { Accordion } from "../../core/core-expand-collapse";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Expand Collapse / Accordion",
  component: Accordion,
};

const Template = (args) => {
  return (
    <Accordion {...args}>
      <Accordion.Panel id="heading1" header="Heading 1">
        <Box between={3}>
          <Box between={2}>
            <Heading level="h4">Heading 1</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>

          <Box between={2}>
            <Heading level="h4">Heading 2</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>
        </Box>
      </Accordion.Panel>

      <Accordion.Panel id="heading2" header="Heading 2">
        <Box between={3}>
          <Box between={2}>
            <Heading level="h4">Heading 3</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>

          <Box between={2}>
            <Heading level="h4">Heading 4</Heading>
            <Paragraph size="medium">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Paragraph>
          </Box>
        </Box>
      </Accordion.Panel>
    </Accordion>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  tag: "h2",
};