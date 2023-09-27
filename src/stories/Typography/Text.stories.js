import React from "react";
import Paragraph from "../../core/core-paragraph/Paragraph";
import Text from "../../core/core-text/Text";

export default {
  title: "Core components/Typography/Text",
  component: Text,
};

const Template = (args) => {
  return <Text {...args} />;
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  children: "This is a text element",
};

export const WithAlternatText = () => {
  return (
    <Paragraph>
      <Text bold>
        This is a bold text. Get Nemeton PREMIUM
        <sup>®</sup> for $85 per month for 12 months.
      </Text>
      <br />
      <Text size="small">
        This is a small text. Sign up for 2 years and save BIG on your first 12
        months.
      </Text>
    </Paragraph>
  );
};

