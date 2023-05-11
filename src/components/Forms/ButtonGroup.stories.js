import React from "react";
import ButtonGroup from "../../core/core-button-group/ButtonGroup";

export default {
  title: "Forms/ButtonGroup",
  component: ButtonGroup,
};

const Template = (args) => {
  return (
    <ButtonGroup name={args.name} label={args.label}>
      <ButtonGroup.Item value="64gb">64 GB</ButtonGroup.Item>
      <ButtonGroup.Item value="128gb">128 GB</ButtonGroup.Item>
      <ButtonGroup.Item value="256gb">256 GB</ButtonGroup.Item>
    </ButtonGroup>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  name: "storageSize",
  label: "Please select a storage size",
};
