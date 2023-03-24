import React from "react";
import VBox from "./VBox";

export default {
  title: "Vertical VBox",
  component: VBox,
};

const Template = (args) => {
  return (
    <VBox backgroundColor={"red"} borderRadius={"10px"}>
      <p>child 1</p>
    </VBox>
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
