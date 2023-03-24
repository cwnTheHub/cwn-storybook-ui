import React from "react";
import Input from "./Input";

export default {
  title: "Input",
  component: Input,
};

const Template = (args) => {
  return (
    <Input
      type={args.type}
      required={args.required}
      focused={args.focused}
      label={args.label}
      errorMessage={args.errorMessage}
      onBlur={args.handleBlur}
      onFocus={args.handleFocus}
      onChange={args.handleChange}
      
    ></Input>
  );
};

export const TextRequiredInput = Template.bind({});
TextRequiredInput.args = {
  type: "text",
  required: true,
  label: "Text to be written",
  errorMessage: "Error message",
  handleChange: (param) => console.log(param),
};
export const EmailInput = Template.bind({});
EmailInput.args = {
  type: "email",
  required: true,
  label: "Text to be written",
  errorMessage: "Error message",
  handleChange: (param) => console.log(param),
};
export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: "password",
  required: true,
  label: "Text to be written",
  errorMessage: "Error message",
  handleChange: (param) => console.log(param),
};
