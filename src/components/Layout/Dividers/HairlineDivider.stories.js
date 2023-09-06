import React from "react";
import Box from "../../../core/core-box/Box";
import HairlineDivider from "../../../core/core-hairline-divider/HairlineDivider";
import Paragraph from "../../../core/core-paragraph/Paragraph";
import Text from "../../../core/core-text/Text";

export default {
  title: "Layout/Dividers/HairlineDivider",
  component: HairlineDivider,
};

export const Horizontal = (args) => {
  return (
    <Box between={4}>
      <HairlineDivider />
      <HairlineDivider gradient />
    </Box>
  );
};

export const Vertical = (args) => {
  return (
    <Box inline between={4}>
      <HairlineDivider vertical />
      <HairlineDivider vertical gradient />
      <Box vertical={7} />
    </Box>
  );
};

export const Example = (args) => {
  return (
    <Box inline between={3}>
      <Box between={0}>
        <Paragraph>
          <Text size="large" bold>
            10000
          </Text>{" "}
          Jobs
        </Paragraph>
      </Box>
      <HairlineDivider vertical />
      <Box between={0}>
        <Paragraph>
          <Text size="large" bold>
            40
          </Text>{" "}
          Submissions
        </Paragraph>
      </Box>
    </Box>
  );
};
