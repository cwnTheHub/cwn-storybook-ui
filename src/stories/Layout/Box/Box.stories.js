import React from "react";
import Box from "../../../core/core-box/Box";
import Button from "../../../core/core-button/Button";
import ChevronLink from "../../../core/core-chevron-link/ChevronLink";
import DimpleDivider from "../../../core/core-dimple-divider/DimpleDivider";
import { FlexGrid } from "../../../core/core-flex-grid";
import Heading from "../../../core/core-heading/Heading";
import Link from "../../../core/core-link/Link";
import Paragraph from "../../../core/core-paragraph/Paragraph";

export default {
  title: "Core components/Layout/Box",
  component: Box,
};

const Template = (args) => {
  return <Box {...args}>{args?.children}</Box>;
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  inline: false,
  tag: "div",
  vertical: undefined,
  horizontal: undefined,
  inset: undefined,
  below: undefined,
  between: undefined,
  className: undefined,
};

export const Example = () => {
  return (
    <Box between={5}>
      <Box tag="section" inset={4} between={3}>
        <Heading level="h2">Package Plan</Heading>
        <Paragraph>
          Take your business out of the office. All across Africa businesses use
          NDS to connect with invesstors and workers.stay connected!
        </Paragraph>
      </Box>

      <DimpleDivider />

      <Box tag="section" inset={4} between={3}>
        <Heading level="h3">Package</Heading>
        <Paragraph>Save up on this bundle</Paragraph>
        <ChevronLink href="#">Learn more</ChevronLink>
      </Box>
    </Box>
  );
};

export const ExampleInline = () => {
  return (
    <Box inline between={3}>
      <Link href="#">Investors</Link>
      <span>|</span>
      <Link href="#">Clients</Link>
      <span>|</span>
      <Link href="#">Workers</Link>
      <span>|</span>
      <Link href="#">Associates</Link>
    </Box>
  );
};

export const Responsiveness = () => {
  return (
    <Box
      inset={{ xs: 2, md: 3, lg: 7 }}
      between={{ xs: 2, md: 3, xl: 8 }}
      inline={{ xs: false, lg: true }}
    >
      <Button>1st Button</Button>
      <Button variant="secondary">2nd Button</Button>
      <Button>3rd Button</Button>
    </Box>
  );
};

export const WithoutSpaceBetween = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <Box className="docs_full-height-box">
            <Paragraph>This is the first line</Paragraph>
            <Paragraph>This is the second line</Paragraph>
            <Paragraph>This is the third line</Paragraph>
          </Box>
        </FlexGrid.Col>

        <FlexGrid.Col>
          <Box between={3} className="docs_full-height-box">
            <Paragraph>
              This first line is much larger than the others to demonstrate the
              effects of space-between
            </Paragraph>
            <Paragraph>This is the second line</Paragraph>
            <Paragraph>This is the third line</Paragraph>
          </Box>
        </FlexGrid.Col>

        <FlexGrid.Col>
          <Box className="docs_full-height-box">
            <Paragraph>This is the first line</Paragraph>
            <Paragraph>This is the second line</Paragraph>
            <Paragraph>This is the third line</Paragraph>
          </Box>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const WithSpaceBetween = () => {
  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <Box between="space-between" className="docs_full-height-box">
            <Paragraph>This is the first line</Paragraph>
            <Paragraph>This is the second line</Paragraph>
            <Paragraph>This is the third line</Paragraph>
          </Box>
        </FlexGrid.Col>

        <FlexGrid.Col>
          <Box between={3} className="docs_full-height-box">
            <Paragraph>
              This first line is much larger than the others to demonstrate the
              effects of space-between
            </Paragraph>
            <Paragraph>This is the second line.</Paragraph>
            <Paragraph>This is the third line</Paragraph>
          </Box>
        </FlexGrid.Col>

        <FlexGrid.Col>
          <Box between="space-between" className="docs_full-height-box">
            <Paragraph>This is the first line</Paragraph>
            <Paragraph>This is the second line</Paragraph>
            <Paragraph>This is the third line</Paragraph>
          </Box>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const Below = () => {
  return (
    <div>
      <Box below={8}>
        <FlexGrid>
          <FlexGrid.Row>
            <FlexGrid.Col>
              <Box inset={4} between={3}>
                <Heading level="h2">Package Plan</Heading>
                <Paragraph>
                  Take your business out of the office. All across Africa
                  businesses use NDS to connect with invesstors and workers.stay
                  connected!
                </Paragraph>
                <ChevronLink href="#">Learn more</ChevronLink>
              </Box>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </Box>
      <div style={{ "background-color": "rgb(1, 156, 253)" }}>
        <WithSpaceBetween />
      </div>
    </div>
  );
};
