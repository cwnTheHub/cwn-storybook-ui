import React, { useState } from "react";
import TextArea from "../../core/core-text-area/TextArea";
import Tooltip from "../../core/core-tooltip/Tooltip";

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

export const TextAreaWithFeedback = () => {
  const [initialState, setInitialState] = useState({
    value: undefined,
    status: undefined,
    errorMessage: undefined,
  });
  const updateValue = (event) => {
    setInitialState({ ...initialState, value: event.target.value });
  };
  const validate = (event) => {
    const value = event.target.value;

    if (value.length < 2) {
      setInitialState({ ...initialState, status: "error" });
    } else {
      setInitialState({ ...initialState, status: "success" });
    }
  };
  return (
    <TextArea
      label="Order instructions"
      id="order-validation"
      value={initialState?.value}
      feedback={initialState?.status}
      error="Field must be filled."
      onChange={updateValue}
      onBlur={validate}
    />
  );
};
export const WithHint = Template.bind({});
WithHint.args = {
  label: "Special requests",
  hint: "Please include order number",
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  label: "Special requests",
  hint: "Please include order number",
  tooltip: (
    <Tooltip copy="en">
      Inquiries will be addressed by our staff ASAP. We will reach out if the
      query cannot be fulfilled. Please check your confirmation email for your
      customer ID.
    </Tooltip>
  ),
};
