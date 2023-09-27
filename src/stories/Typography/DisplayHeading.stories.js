import React from "react";
import DisplayHeading from "../../core/core-display-heading/DisplayHeading";

export default {
  title: "Core components/Typography/DisplayHeading",
  component: DisplayHeading,
};
const Template = (args) => {
  return <DisplayHeading {...args}>{args?.children}</DisplayHeading>;
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  children: "This is a display heading",
};
