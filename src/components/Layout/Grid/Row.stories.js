import React from "react";
import { Row } from "../../../core/core-flex-grid";

import styled from "styled-components";
import Box from "../../../core/core-box/Box";
import { FlexGrid } from "../../../core/core-flex-grid";
import Text from "../../../core/core-text/Text";
import { borders } from "../../../shared-styles";

export default {
  title: "Layout/Grid/Row",
  component: Row,
};

const StyledBox = styled(Box)({
  ...borders.thin,
});

const Template = (args) => {
  return (
    <FlexGrid outsideGutter={false} gutter={false}>
      <FlexGrid.Row horizontalAlign="start">
        <FlexGrid.Col xs={4} md={2}>
          <StyledBox vertical={2}>
            <Text>Left</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={4} md={2}>
          <StyledBox vertical={2}>
            <Text>aligned</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>

      <FlexGrid.Row horizontalAlign="center">
        <FlexGrid.Col xs={4} md={2}>
          <StyledBox vertical={2}>
            <Text>Center</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={4} md={2}>
          <StyledBox vertical={2}>
            <Text>aligned</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>

      <FlexGrid.Row horizontalAlign="end">
        <FlexGrid.Col xs={4} md={2}>
          <StyledBox vertical={2}>
            <Text>Right</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={4} md={2}>
          <StyledBox vertical={2}>
            <Text>aligned</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const TheRow = Template.bind({});
TheRow.args = {};

export const Alignment = (args) => {
  return (
    <FlexGrid outsideGutter={false} gutter={false}>
      <FlexGrid.Row verticalAlign="top">
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>Top vertical aligned</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <div style={{ height: 100 }} />
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>

      <FlexGrid.Row verticalAlign="middle">
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>Middle vertical aligned</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <div style={{ height: 100 }} />
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>

      <FlexGrid.Row verticalAlign="bottom">
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>Bottom vertical aligned</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <div style={{ height: 100 }} />
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const Distribution = (args) => {
  return (
    <FlexGrid outsideGutter={false} gutter={false}>
      <FlexGrid.Row distribute="around">
        <FlexGrid.Col xs={3}>
          <StyledBox vertical={2}>
            <Text>Around</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={3}>
          <StyledBox vertical={2}>
            <Text>Around</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={3}>
          <StyledBox vertical={2}>
            <Text>Around</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>

      <FlexGrid.Row distribute="between">
        <FlexGrid.Col xs={3}>
          <StyledBox vertical={2}>
            <Text>Between</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={3}>
          <StyledBox vertical={2}>
            <Text>Between</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={3}>
          <StyledBox vertical={2}>
            <Text>Between</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const ReverseItemOrder = (args) => {
  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row xsReverse={true} mdReverse={false} xlReverse={true}>
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
    </FlexGrid>
  );
};
