import React from "react";
import Radio from "../../core/core-radio/Radio";

export default {
  title: "Forms/Radio",
  component: Radio,
};
let choice = null;

const Template = (args) => {
  return (
    <Radio
      label={args.label}
      name={args.name}
      value={args.value}
      checked={args.checked}
      id={args.id}
      description={args.description}
      feedback={args.feedback}
      error={args.error}
    ></Radio>
  );
};

export const SampleUsage = Template.bind({});
SampleUsage.args = {
  label: "e.Bill",
  name: "monthly-bill",
  value: "e.bill",
  checked: true,
  onChange: () => choice === "e.bill",
};

export const RadioWithDescription = Template.bind({});
RadioWithDescription.args = {
  label: "personal",
  name: "personal",
  value: "personal",
  description: "You will be shown services designed",
  checked: true,
  onChange: () => choice === "personal",
};

