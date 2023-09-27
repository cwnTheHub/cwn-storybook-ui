import React, { useState } from "react";
import Box from "../../core/core-box/Box";
import Checkbox from "../../core/core-checkbox/Checkbox";
import Text from "../../core/core-text/Text";

export default {
  title: "Core components/Forms/ Checkbox",
  component: Checkbox,
};

const Template = (args) => {
  return (
    <Checkbox
      label={args.label}
      name={args.name}
      value={args.value}
      checked={args.checked}
      id={args.id}
      feedback={args.feedback}
      error={args.error}
    />
  );
};
export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  label: "This is a checkbox",
  name: "Check me",
  value: "This is a checkbox",
};

const Controlled = (args) => {
  const [initialState, setInitialState] = useState({
    consumerSelected: true,
    businessSelected: false,
  });
  const handleCheck = (event) => {
    if (event.target.value === "consumer") {
      setInitialState({ consumerSelected: event.target.checked });
    } else if (event.target.value === "business") {
      setInitialState({ businessSelected: event.target.checked });
    }
  };
  return (
    <Box tag="div" between={2}>
      <Checkbox
        checked={initialState.consumerSelected}
        onChange={handleCheck}
        name="products"
        value="consumer"
        label="Checkbox 1"
      />
      <Checkbox
        checked={initialState.businessSelected}
        onChange={handleCheck}
        name="products"
        value="business"
        label="Checkbox 2"
      />
    </Box>
  );
};

export const ControlledCheckboxes = Controlled.bind({});

const TemplateUnControlled = (args) => {
  return (
    <Box tag="div" between={2}>
      <Checkbox name="services" value="posting" label="Posting" />
      <Checkbox name="services" value="recruting" label="Recruting" />
      <Checkbox name="services" value="advert" label="Advertize" />
      <Checkbox
        name="services"
        value="template"
        label="Template"
        defaultChecked
      />
    </Box>
  );
};

export const UncontrolledCheckbox = TemplateUnControlled.bind({});

const TemplateError = (args) => {
  const message = "Please agree to the terms and conditions";

  const [initialState, setInitialState] = useState({
    feedback: "error",
    message: message,
  });

  const handleCheck = (event) => {
    if (event.target.checked) {
      setInitialState({ feedback: undefined, message: undefined });
    } else {
      setInitialState({ feedback: "error", message: message });
    }
  };

  return (
    <Checkbox
      name="terms"
      value="agree"
      label="I agree to the terms and conditions"
      feedback={initialState.feedback}
      error={initialState.message}
      onChange={handleCheck}
    />
  );
};
export const CheckboxWithFeedback = TemplateError.bind({});
