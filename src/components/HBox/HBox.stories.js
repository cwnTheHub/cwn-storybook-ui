import React from "react";
import Box from "../Box/Box";
import HBox from "./HBox";

export default {
  title: "Horizontal Box",
  component: HBox,
};

const Template = (args) => {
  return (
    <HBox
      backgroundColor={args.backgroundColor}
      borderRadius={args.borderRadius}
      height={args.height}
      width={args.width}
    >
      <Box>
        <p>child 1</p>
      </Box>
      <Box>
        <p>child 2</p>
      </Box>
      <Box>
        <p>child 3</p>
      </Box>
    </HBox>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: "gray",
  borderRadius: "0px",
  height: "100px",
  width: "auto",
};
