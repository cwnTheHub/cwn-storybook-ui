import React from "react";
import Input from "../../core/core-input/Input";

export default {
  title: "Core components/Forms/Input",
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
      defaultValue={args.defaultValue}
    />
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  id: "gdfgdfg",
  label: "Name",
  defaultValue: "Zeus",
};
export const Controlled = Template.bind({});
Controlled.args = {
  id: "gdfgdfg",
  label: "Input name",
  defaultValue: "Zeus",
};


export const FeedbackSuccess = Template.bind({});
FeedbackSuccess.args = {
  id: "gdfgdfg",
  label: "Username",
  defaultValue: "guest12345",
  feedback: "success",
};

export const FeedbackError = Template.bind({});
FeedbackError.args = {
  id: "gdfgdfg",
  label: "Email",
  defaultValue: "guest@nds_core.com",
  feedback: "error",
  error: (
    <React.Fragment>
      That email is already associated with another account.
    </React.Fragment>
  ),
};

export const InputWithHint = Template.bind({});
InputWithHint.args = {
  id: "gdfgdfg",
  label: "Registration number",
  hint: "minimum 5 digits",
  type: "number",
};
export const InputWithHintPosition = Template.bind({});
InputWithHintPosition.args = {
  id: "gdfgdfg",
  label: "Registration number",
  hint: "Enter the account number in the box below to go to the overview page for that account.",
  hintPosition:"below"
};