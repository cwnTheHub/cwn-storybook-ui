import React from "react";
import { BenefitWithHeading } from "../../core/core-benefit";
import Box from "../../core/core-box/Box";
import ButtonLink from "../../core/core-button-link/ButtonLink";
import Button from "../../core/core-button/Button";
import Card from "../../core/core-card/Card";
import ChevronLink from "../../core/core-chevron-link/ChevronLink";
import { AddUser, Briefcase, DataLimit } from "../../core/core-decorative-icon";
import { FlexGrid } from "../../core/core-flex-grid";
import HairlineDivider from "../../core/core-hairline-divider/HairlineDivider";

import Heading from "../../core/core-heading/Heading";
import Notification from "../../core/core-notification/Notification";
import Paragraph from "../../core/core-paragraph/Paragraph";
import PriceLockup from "../../core/core-price-lockup/PriceLockup";
import Text from "../../core/core-text/Text";

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

export const Variants = () => {
  return (
    <Box inline between={3}>
      <Card variant="branded">
        <Box between={3}>
          <Heading level="h4">Holiday deal</Heading>

          <Paragraph size="medium">
            Get a new smartphone for $0
            <br />
            on a 2-year plan.
          </Paragraph>
        </Box>
      </Card>

      <Card variant="alternative">
        <Box between={3}>
          <Heading level="h4">Holiday deal</Heading>

          <Paragraph size="medium">
            Get a new smartphone for $0
            <br />
            on a 2-year plan.
          </Paragraph>
        </Box>
      </Card>

      <Card>
        <Box between={3}>
          <Heading level="h4">Find the right gift</Heading>

          <Paragraph>
            Find something they will love from our
            <br />
            selection of great devices.
          </Paragraph>

          <div>
            <ChevronLink variant="primary" href="#">
              Explore latest devices
            </ChevronLink>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export const CardWithBorder = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={5}>
          <Card variant="defaultWithBorder">
            <Box between={3}>
              <Heading level="h3">Special Offer</Heading>
              <PriceLockup
                size="medium"
                price="55"
                rateText="per month"
                bottomText="for 24 months, then $75 per month"
                signDirection="left"
              />
              <HairlineDivider />
              <Text size="medium">
                Good for basic browsing, and posting to social media.
              </Text>
              <BenefitWithHeading>
                <BenefitWithHeading.Item icon={DataLimit} heading="15 posts">
                  upload per day
                </BenefitWithHeading.Item>
                <BenefitWithHeading.Item icon={AddUser} heading="1000 people">
                  this is a text
                </BenefitWithHeading.Item>
                <BenefitWithHeading.Item
                  icon={Briefcase}
                  heading="Unlimited partnership"
                >
                  this is a text
                </BenefitWithHeading.Item>
              </BenefitWithHeading>
              <Notification variant="branded">
                <Text bold>Offer:</Text> Order Internet online on a 2 year term
                and get a $150 bill credit.
              </Notification>
              <Button>Add to cart</Button>
              <ChevronLink href="#">Learn more</ChevronLink>
            </Box>
          </Card>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};
