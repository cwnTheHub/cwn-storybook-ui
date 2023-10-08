import React from "react";
import Card from "../../core/core-card/Card";
import FlexGrid from "../../core/core-flex-grid/FlexGrid";
import Heading from "../../core/core-heading/Heading";
import Paragraph from "../../core/core-paragraph/Paragraph";
import PriceLockup from "../../core/core-price-lockup/PriceLockup";
import { FootnoteLink } from "../../core/core-terms-and-conditions";
import Text from "../../core/core-text/Text";

export default {
  title: "Core  components/Terms and Conditions/FootnoteLink",
  component: FootnoteLink,
};

const Template = (args) => {
  return <FootnoteLink {...args} />;
};

export const MinimalUsage = () => {
  return (
    <Card>
      <Heading level="h4">For Non customers</Heading>

      <Paragraph>$30 per month</Paragraph>

      <Paragraph>
        <Text>
          Includes unlimited nationwide calling and 5 voice features.
          <Template number={[3, 4]} onClick={(number, ref) => {}} copy="en" />
        </Text>
      </Paragraph>
    </Card>
  );
};
export const WithCoreComponents = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col xs={3}>
          <PriceLockup
            size="medium"
            topText="Starting at"
            price="25"
            rateText="/month"
            bottomText="$68 /month after 3 months"
            signDirection="left"
            footnoteLinks={
              <Template
                number={[1, 2, 3]}
                onClick={(number, ref) => {}}
                copy="en"
              />
            }
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};
