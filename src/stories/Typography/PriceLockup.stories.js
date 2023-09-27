import React from "react";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import Card from "../../core/core-card/Card";
import ChevronLink from "../../core/core-chevron-link/ChevronLink";
import { FlexGrid } from "../../core/core-flex-grid";
import Heading from "../../core/core-heading/Heading";
import PriceLockup from "../../core/core-price-lockup/PriceLockup";
import { FootnoteLink } from "../../core/core-terms-and-conditions";
import Text from "../../core/core-text/Text";

export default {
  title: "Core components/Typography/PriceLockup",
  component: PriceLockup,
};

const Template = (args) => {
  return <PriceLockup {...args} />;
};

export const StartingPrice = Template.bind({});

StartingPrice.args = {
  size: "small",
  topText: "Starting at",
  price: "25",
  signDirection: "left",
  rateText: "/month",
  bottomText: "On a 2-year Easy Share Premium Plus Plan",
  a11yText: "25 dollars per month",
  footnoteLinks: (
    <FootnoteLink number={[7, 8]} onClick={(number, ref) => {}} copy="en" />
  ),
};

export const Standard = Template.bind({});

Standard.args = {
  size: "small",
  topText: "Starting at",
  price: "25",
  signDirection: "left",
  rateText: "/month",
  bottomText: "$68 /month after 3 months",
};

export const WithStrikeThrough = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={9} xl={5}>
          <Card variant="defaultWithBorder">
            <Box between={3}>
              <Heading level="h3">Internet 15 - Special Offer</Heading>
              <FlexGrid>
                <FlexGrid.Row verticalAlign="bottom" horizontalAlign="start">
                  <FlexGrid.Col xs={12} md={5}>
                    <PriceLockup
                      topText="Starting at"
                      size="medium"
                      price="25"
                      signDirection="left"
                      rateText="/month"
                      a11yText="25 dollars per month"
                    />
                  </FlexGrid.Col>
                  <FlexGrid.Col xs={12} md={5}>
                    <PriceLockup
                      size="small"
                      strikethrough
                      a11yText="was 50 dollars per month"
                      price="50"
                      signDirection="left"
                      rateText="/month"
                    />
                  </FlexGrid.Col>
                </FlexGrid.Row>
              </FlexGrid>
              <Text size="medium">
                Good for basic browsing, and posting to social media.
              </Text>
              <Button>Add to cart</Button>
              <ChevronLink href="#">Learn more</ChevronLink>
            </Box>
          </Card>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const WithMediumStrikeThrough = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row verticalAlign="bottom" horizontalAlign="start">
        <FlexGrid.Col xs={12} md={5} xl={3}>
          <PriceLockup
            topText="Starting at"
            size="large"
            price="25"
            signDirection="left"
            rateText="/month"
          />
        </FlexGrid.Col>
        <FlexGrid.Col xs={12} md={4} xl={2}>
          <PriceLockup
            size="medium"
            strikethrough
            a11yText="was 50 dollars per month"
            price="50"
            signDirection="left"
            rateText="/month"
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const WithFootnoteLinkStandard = () => {
  return (
    <PriceLockup
      size="medium"
      topText="Starting at"
      price="25"
      rateText="/month"
      signDirection="left"
      footnoteLinks={
        <FootnoteLink
          number={[1, 2, 3]}
          onClick={(number, ref) => {}}
          copy="en"
        />
      }
    />
  );
};
export const WithFootnoteLink = () => {
  return (
    <PriceLockup
      size="medium"
      topText="Starting at"
      price="25"
      rateText="/month"
      bottomText="$68 /month after 3 months"
      signDirection="left"
      footnoteLinks={
        <FootnoteLink
          number={[1, 2, 3]}
          onClick={(number, ref) => {}}
          copy="en"
        />
      }
    />
  );
};
export const WithFootnoteLinkOtherExample = () => {
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
              <FootnoteLink
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
