import React from "react";
import { BenefitWithHeading } from "../../core/core-benefit";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import Card from "../../core/core-card/Card";
import ChevronLink from "../../core/core-chevron-link/ChevronLink";
import { DataLimit, Speed } from "../../core/core-decorative-icon";
import { FlexGrid } from "../../core/core-flex-grid";
import HairlineDivider from "../../core/core-hairline-divider/HairlineDivider";
import Heading from "../../core/core-heading/Heading";
import { Input } from "../../core/core-input";
import Login from "../../core/core-login/Login";
import Text from "../../core/core-text/Text";

export default {
  title: "Content/ Login",
  component: Login,
};

export const Template = (args) => {
  return (
    <Login/>
    /* FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={8}>
          <Card variant="defaultWithBorder">
            <Box between={3}>
              <Heading level="h3">Internet 15 - Special Offer</Heading>
              <HairlineDivider />
              <Text size="medium">
                Good for basic browsing, and posting to social media.
              </Text>
              <BenefitWithHeading>
                <BenefitWithHeading.Item icon={Speed} heading="15 mbps">
                  download speed
                </BenefitWithHeading.Item>
                <BenefitWithHeading.Item icon={Speed} heading="1 mbps">
                  upload speed
                </BenefitWithHeading.Item>
                <BenefitWithHeading.Item icon={DataLimit} heading="Unlimited">
                  Monthly data
                </BenefitWithHeading.Item>
              </BenefitWithHeading>
              <Input
                hintPosition={"below"}
                hint={"Enter your username or email"}
                label={"Username"}
              />
              <Button>Continue</Button>
              <ChevronLink href="#"></ChevronLink>
            </Box>
          </Card>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid> */
      
  );
};
