import React from "react";
import Box from "../../core/core-box/Box";
import ButtonLink from "../../core/core-button-link/ButtonLink";
import { FlexGrid } from "../../core/core-flex-grid";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";
import Text from "../../core/core-text/Text";

export default {
  title: "Core components/Typography/Heading",
  component: Heading,
};

const Template = (args) => {
  return <Heading {...args}>{args?.children}</Heading>;
};

export const Minimal = () => {
  return (
    <Box between={3}>
      <Heading level="h1">Heading level 1 with an &lt;h1&gt; tag</Heading>
      <Heading level="h2">Heading level 2 with an &lt;h2&gt; tag</Heading>
      <Heading level="h2" tag="h3">
        Heading level 2 with an &lt;h3&gt; tag
      </Heading>
      <Heading level="h3">Heading level 3 with an &lt;h3&gt; tag</Heading>
      <Heading level="h4">Heading level 4 with an &lt;h4&gt; tag</Heading>
      <Heading level="h4" tag="h3">
        Heading level 4 with an &lt;h3&gt; tag
      </Heading>
    </Box>
  );
};

export const Example = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row xsReverse={true} smReverse={true} mdReverse={false}>
        <FlexGrid.Col xs={12} md={0}>
          <Paragraph>This can be an image</Paragraph>
        </FlexGrid.Col>
        <FlexGrid.Col xs={12} md={6}>
          <Box between={3}>
            <Box between={4}>
              {/* Heading level 4 with an h1 tag */}
              <Heading level="h4" tag="h1">
                Consider this: $0 first month
              </Heading>

              {/* Heading level 4 with an h3 tag */}
              <Heading level="h1" tag="h2">
                Our available membership
              </Heading>
            </Box>

            <Text>
              Join our exclusive membership program today and unlock a world of
              benefits! Enjoy special discounts, early access to new features,
              exclusive content, and much more. Become a valued member and
              experience the best of what we have to offer.
            </Text>

            <div>
              <ButtonLink>Get Started</ButtonLink>
            </div>
          </Box>
        </FlexGrid.Col>
        <FlexGrid.Col xs={0} md={6}>
          <Paragraph>This can be an image</Paragraph>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};
