import React, { useState } from "react";
import Box from "../../core/core-box/Box";
import Radio from "../../core/core-radio/Radio";
import Text from "../../core/core-text/Text";

export default {
  title: "Core components/Forms/Radio",
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

export const RadioWithDescription = () => {
  const [initialState, setInitialState] = useState({
    getChoice: "radio.11",
  });
  const setChoiceForRadio = (event) => {
    setInitialState({ getChoice: event.target.value });
  };

  return (
    <Box between={2}>
      <Text bold size="medium">
        Select an option
      </Text>

      <Radio
        label="radio.11"
        name="al-radios"
        value="radio.11"
        description="You will be shown radio selection"
        checked={initialState.getChoice === "radio.11"}
        onChange={setChoiceForRadio}
      />
      <Radio
        label="radio.12"
        name="al-radios"
        value="radio.12"
        description="You will be shown radio selection"
        checked={initialState.getChoice === "radio.12"}
        onChange={setChoiceForRadio}
      />
    </Box>
  );
};

export const Controlled = () => {
  const [initialState, setInitialState] = useState({
    choice: "radio.1",
  });
  const setChoice = (event) => {
    setInitialState({ choice: event.target.value });
  };

  return (
    <Box between={2}>
      <Text bold size="medium">
        Select an option
      </Text>

      <Radio
        label="radio.1"
        name="all-radios"
        value="radio.1"
        checked={initialState.choice === "radio.1"}
        onChange={setChoice}
      />
      <Radio
        label="radio.2"
        name="all-radios"
        value="radio.2"
        checked={initialState.choice === "radio.2"}
        onChange={setChoice}
      />
    </Box>
  );
};

export const UnControlled = () => {
  return (
    <Box between={2}>
      <Text bold size="medium">
        Select an option
      </Text>

      <Radio label="radio.1" name="a-radios" value="radio.1" />
      <Radio label="radio.2" name="a-radios" value="radio.2" />
      <Radio label="radio.3" name="a-radios" value="radio.3" />
      <Radio label="radio.4" name="a-radios" value="radio.4" />
    </Box>
  );
};
