import React from "react";
import Input from "../../core/core-input/Input";

export default {
  title: "Input",
  component: Input,
};

const Template = (args) => {
  return (
    <Input
      id={args.id}
      value={args.value}
      type={args.type}
      label={args.label}
      hint={args.hint}
      hintPosition={args.hintPosition}
      feedback={args.feedback}
      error={args.error}
      helper={args.helper}
      tooltip={args.tooltip}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  id:"gdfgdfg"
};
