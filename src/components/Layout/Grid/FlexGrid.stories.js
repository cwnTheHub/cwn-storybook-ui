import React from "react";
import styled from "styled-components";
import Box from "../../../core/core-box/Box";
import { FlexGrid } from "../../../core/core-flex-grid";
import Notification from "../../../core/core-notification/Notification";
import Paragraph from "../../../core/core-paragraph/Paragraph";
import Text from "../../../core/core-text/Text";
import { borders } from "../../../shared-styles";

export default {
  title: "Layout/Grid/FlexGrid",
  component: FlexGrid,
};

const StyledBox = styled(Box)({
  ...borders.thin,
});

const Template = (args) => {
  return (
    <FlexGrid {...args}>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>1/3</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>2/3</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>3/3</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const Accessibility = Template.bind({});
Accessibility.args = {};

export const RemovingTheGutter = Template.bind({});
RemovingTheGutter.args = {
  gutter: false,
};

const OutsideGutterTemp = (args) => {
  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>Parent Column</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>Parent Column</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <FlexGrid {...args}>
            <FlexGrid.Row>
              <FlexGrid.Col>
                <StyledBox vertical={2}>
                  <Text>Child Column</Text>
                </StyledBox>
              </FlexGrid.Col>
              <FlexGrid.Col>
                <StyledBox vertical={2}>
                  <Text>Child Column</Text>
                </StyledBox>
              </FlexGrid.Col>
            </FlexGrid.Row>
          </FlexGrid>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const RemovingTheOutsideGutter = OutsideGutterTemp.bind({});
RemovingTheOutsideGutter.args = {
  outsideGutter: false,
};

const FullWidthTemplate = (args) => {
  return (
    <>
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col>
            <Box vertical={3}>
              <Paragraph>
                This is page content that has a fixed width.
              </Paragraph>
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>

      <Notification>
        This is a notification that has a full-width background, and fixed-width
        content.
      </Notification>

      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col>
            <Box vertical={3}>
              <Paragraph>
                This is more page content that has a fixed width.
              </Paragraph>
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </>
  );
};

export const FullWidth = FullWidthTemplate.bind({});
FullWidth.args = {};

const ReverseTemplate = (args) => {
  return (
    <FlexGrid {...args}>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>1</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>2</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>3</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>4</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>5</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>6</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const ReverseItemOrder = ReverseTemplate.bind({});
ReverseItemOrder.args = {
  xsReverse: true,
  mdReverse: false,
  xlReverse: true,
};


