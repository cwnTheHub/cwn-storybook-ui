import React from "react";
import Select from "../../core/core-select/Select";

export default {
  title: "Core components/Forms/Select",
  component: Select,
};

const Template = (args) => {
  return (
    <Select
      id={args.id}
      options={args.options}
      placeholder={args.placeholder}
      label={args.label}
      hint={args.hint}
      hintPosition={args.hintPosition}
      value={args.value}
      defaultValue={args.defaultValue}
      feedback={args.feedback}
      error={args.error}
      helper={args.helper}
      tooltip={args.tooltip}
    />
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  id: "fgsl",
  label: "Province",
  placeholder: "Please select...",
  options: [
    { text: "Alberta", value: "AB" },
    { text: "British Columbia", value: "BC" },
    { text: "Ontario", value: "ON" },
    { text: "Quebec", value: "QC" },
  ],
};
