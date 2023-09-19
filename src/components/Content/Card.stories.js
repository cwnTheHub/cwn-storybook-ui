import React from "react";
import Box from "../../core/core-box/Box";
import ButtonLink from "../../core/core-button-link/ButtonLink";
import Card from "../../core/core-card/Card";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Core components/Content/ Card",
  component: Card,
};

export const Template = (args) => {
  return (
    <Card>
      <Box between={4}>
        <Box between={3}>
          <Heading level="h2">Need a hand?</Heading>
          <Paragraph>
            Ready to order? Have a question? We will get back to you, with
            volume discounts available to larger accounts.
          </Paragraph>
        </Box>
        <div>
          <ButtonLink href="#">Request sales callback</ButtonLink>
        </div>
      </Box>
    </Card>
  );
};
export const MinimalUsage = Template.bind({});
MinimalUsage.args = {};
