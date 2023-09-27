import React from "react";
import Box from "../../core/core-box/Box";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Core components/Typography/Paragraph",
  component: Paragraph,
};

const Template = (args) => {
  return <Paragraph {...args}>{args.children}</Paragraph>;
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  children: "This is a paragraph, try it",
};

export const Inverted = () => {
  return (
    <Box inset={3} style={{ backgroundColor: "#019cfd" }}>
      <Paragraph invert>This is an inverted paragraph. </Paragraph>
    </Box>
  );
};
