import React from "react";
import TextArea from "../../core/core-text-area/TextArea";

export default {
  title: "Core components/Forms/TextArea",
  component: TextArea,
};

const Template = (args) => {
  return (
    <TextArea
      value={args.value}
      label={args.label}
      hint={args.hint}
      feedback={args.feedback}
      error={args.error}
      helper={args.helper}
      tooltip={args.tooltip}
      ref={args.ref}
    ></TextArea>
  );
};

const myTextArea = React.createRef();

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  label: "Enter your feedback",
  ref: { myTextArea },
};
