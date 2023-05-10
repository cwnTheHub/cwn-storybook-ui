import React from "react";
import InputFeedback from "../../core/core-input-feedback/InputFeedback";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Forms/InputFeedback",
  component: InputFeedback,
};

const Template = (args) => {
  return (
    <InputFeedback feedback={args.feedback}>
      <Paragraph>Provide a feedback</Paragraph>
    </InputFeedback>
  );
};

export const Standalone = Template.bind({});
Standalone.args = {};

export const StandaloneError = Template.bind({});
StandaloneError.args = {
  feedback: "error",
};

export const StandaloneSuccess = Template.bind({});
StandaloneSuccess.args = {
  feedback: "success",
};
