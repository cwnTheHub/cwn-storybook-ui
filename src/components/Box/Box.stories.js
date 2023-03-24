import React from "react";
import Box from "./Box";

export default {
  title: "Box",
  component: Box,
};

const Template = (args) => {
  return (
    <Box
    borderRadius={args.borderRadius}
    height={args.height}
    width={args.width}
    centered={args.centered}
    onEnd={args.onEnd}
    backgroundColor={args.backgroundColor}
    >
    </Box>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: "red",
  borderRadius: "10px",
};

export const Second = {
  args: {
    backgroundColor: "red",
    borderRadius: "10px",
  },
};
