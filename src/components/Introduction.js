import React from "react";
import Box from "../core/core-box/Box";
import ChevronLink from "../core/core-chevron-link/ChevronLink";
import HairlineDivider from "../core/core-hairline-divider/HairlineDivider";
import Heading from "../core/core-heading/Heading";
import Notification from "../core/core-notification/Notification";
import Paragraph from "../core/core-paragraph/Paragraph";
import Text from "../core/core-text/Text";

const Introduction = () => {
  return (
    <Box between={3}>
      <Notification variant="warning" copy="en">
        <Text small>
          We are excited to share that our npm package, nds_core, is currently
          in active development. Our dedicated team is hard at work enhancing
          its features, improving its performance, and ensuring its reliability.
        </Text>
      </Notification>
      <Heading level="h1">Nemeton Digital System</Heading>
      <Paragraph>
        Welcome to the Nemeton Design System component library. Our design
        system is founded on the principles, characteristics, and aesthetics
        that define the Nemeton brand. Within this component library, you will
        discover React components thoughtfully crafted to embody the essence of
        the Nemeton brand.
      </Paragraph>
      <Notification variant="instructional" copy="en">
        <Text bold>
          New! The documentation experience has been updated to be more
          performant!
        </Text><br/>
        <Text>
          To navigate the documentation, please use the sidebar to select the
          component you want to view. Keep in mind that code sandbox changes
          will not persist if the page is switched to a new component. We
          recommend opening a new tab if other components need to be referenced
          while working in a code sandbox.
        </Text>
      </Notification>
      <HairlineDivider />
      <Heading level="h2">New to Nemeton (@nds_core)?</Heading>
      <Paragraph>
        Get familiar with the design system, our support and core components by
        following the links below
      </Paragraph>
      <ChevronLink href="/?path=/docs/layout-responsive--documentation">
        {" "}
        Getting started For developers
      </ChevronLink>
      <ChevronLink href="#"> Core components</ChevronLink>
      <HairlineDivider />
    </Box>
  );
};

export default Introduction;
