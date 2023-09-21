import React from "react";
import styled from "styled-components";;
import Box from "../../../core/core-box/Box";
import { Col, FlexGrid } from "../../../core/core-flex-grid";
import Text from "../../../core/core-text/Text";
import { borders } from "../../../shared-styles";

export default {
  title: "Core components/Layout/Grid/Col",
  component: Col,
};

const StyledBox = styled(Box)({
  ...borders.thin,
});

export const ResponsiveColumnWidths = (args) => {
  return (
    <FlexGrid gutter={false} limitWidth={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={6}>
          <StyledBox vertical={2}>
            <Text>12 xs, 6 md</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={12} md={6}>
          <StyledBox vertical={2}>
            <Text>12 xs, 6 md</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>

      <FlexGrid.Row>
        <FlexGrid.Col xs={6} md={4}>
          <StyledBox vertical={2}>
            <Text>6 xs, 4 md</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={6} md={4}>
          <StyledBox vertical={2}>
            <Text>6 xs, 4 md</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={6} md={4}>
          <StyledBox vertical={2}>
            <Text>6 xs, 4 md</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const OffsettingColumns = (args) => {
  return (
    <FlexGrid gutter={false} limitWidth={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={4}>
          <StyledBox vertical={2}>
            <Text>4 xs</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={4} xsOffset={4}>
          <StyledBox vertical={2}>
            <Text>4 xs, offset 4</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

export const HidingColumns = (args) => {
  return (
    <FlexGrid gutter={false} limitWidth={false}>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <StyledBox vertical={2}>
            <Text>1</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col xs={0} sm={0} md={4} xl={0}>
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

export const AligningColumnContent = (args) => {
  return (
    <FlexGrid gutter={false} limitWidth={false}>
      <FlexGrid.Row>
        <FlexGrid.Col horizontalAlign={{ xs: "center", md: "left" }}>
          <StyledBox vertical={2}>
            <Text>Left on desktop, center on mobile</Text>
          </StyledBox>
        </FlexGrid.Col>
        <FlexGrid.Col horizontalAlign="right">
          <StyledBox vertical={2}>
            <Text>Always right</Text>
          </StyledBox>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};
