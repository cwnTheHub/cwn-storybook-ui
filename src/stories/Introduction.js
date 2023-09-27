import React from "react";
import Box from "../core/core-box/Box";
import ChevronLink from "../core/core-chevron-link/ChevronLink";
import DimpleDivider from "../core/core-dimple-divider/DimpleDivider";
import ExpandCollapse from "../core/core-expand-collapse/ExpandCollapse";
import FlexGrid from "../core/core-flex-grid/FlexGrid";
import HairlineDivider from "../core/core-hairline-divider/HairlineDivider";
import Heading from "../core/core-heading/Heading";
import Notification from "../core/core-notification/Notification";
import Paragraph from "../core/core-paragraph/Paragraph";
import Text from "../core/core-text/Text";
import UnorderedList from "../core/core-unordered-list/UnorderedList";
import data from "./introductionText";

const Introduction = () => {
  return (
    <Box between={3} inset={4}>
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
        </Text>
        <br />
        <Text>
          To navigate the documentation, please use the sidebar to select the
          component you want to view. Keep in mind that code sandbox changes
          will not persist if the page is switched to a new component. We
          recommend opening a new tab if other components need to be referenced
          while working in a code sandbox.
        </Text>
      </Notification>
      <HairlineDivider />
      <Heading level="h2">New to Nemeton digital?</Heading>
      <Paragraph>
        Get familiar with the design system, our support and core components by
        following the links below
      </Paragraph>
      <ChevronLink href="/?path=/docs/layout-responsive--documentation">
        Getting started For developers
      </ChevronLink>

      <ExpandCollapse topDivider={false} compact={true} tag="h2">
        <ExpandCollapse.Panel id="core-components" header="Core components">
          <Notification variant="warning" copy="en">
            <Text small>
              Our core components are currently in active development,
              undergoing enhancements and optimizations. We are committed to
              delivering high-quality, reliable building blocks for our
              application. Stay tuned for updates as we work to refine and
              improve these essential elements.
            </Text>
          </Notification>
          <Box between={3}>
            <Box between={2}>
              <UnorderedList>
                <FlexGrid>
                  <Heading level="h3">Forms</Heading>
                  <FlexGrid.Row>
                    {data?.forms?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={2} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>
                  <Heading level="h3">Layout</Heading>
                  <FlexGrid.Row>
                    {data?.layout?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={2} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>
                  <Heading level="h3">Typography</Heading>
                  <FlexGrid.Row>
                    {data?.typography?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={2} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>
                  <Heading level="h3">Expand Collapse</Heading>
                  <FlexGrid.Row>
                    {data?.expandcollapse?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={2} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>
                  <Heading level="h3">Links</Heading>
                  <FlexGrid.Row>
                    {data?.links?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={2} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>
                  <Heading level="h3">Lists</Heading>
                  <FlexGrid.Row>
                    {data?.lists?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={3} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>

                  <Heading level="h3">Feedback Indicators</Heading>
                  <FlexGrid.Row>
                    {data?.feedback?.map((item, index) => (
                      <FlexGrid.Col xs={4} md={3} key={index}>
                        <UnorderedList.Item>
                          <ChevronLink href={item?.link}>
                            {item?.title}
                          </ChevronLink>
                        </UnorderedList.Item>
                      </FlexGrid.Col>
                    ))}
                  </FlexGrid.Row>
                </FlexGrid>
              </UnorderedList>
            </Box>
          </Box>
        </ExpandCollapse.Panel>
        <ExpandCollapse.Panel
          id="composite-components"
          header="Composite components"
        >
          <Notification variant="error" copy="en">
            <Text small>
              Our core components are currently in active development,
              undergoing enhancements and optimizations. We are committed to
              delivering high-quality, reliable building blocks for our
              application. Stay tuned for updates as we work to refine and
              improve these essential elements.
            </Text>
          </Notification>
          <Box between={3}>
            <Box between={2}></Box>
          </Box>
        </ExpandCollapse.Panel>
      </ExpandCollapse>
    </Box>
  );
};

export default Introduction;
