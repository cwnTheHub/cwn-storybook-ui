import React from "react";
import Link from "../../core/core-link/Link";
import Notification from "../../core/core-notification/Notification";
import Text from "../../core/core-text/Text";

export default {
  title: "Feedback Indicators/Notification ",
  component: Notification,
};

const Template = (args) => {
  return (
    <Notification
      variant={args.variant}
      dismissible={args.dismissible}
      onDismiss={args.onDismiss}
      onExit={args.onExit}
    >
      <Text bold>Help us improve this website.</Text> We’d love to hear your
      feedback. <Link href="http://nds_core.com/feedback">Tell us what you think</Link>
    </Notification>
  );
};

export const Branded = Template.bind({});
Branded.args = {
  variant: "branded",
  copy: "en",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  copy: "en",
};

export const Error = Template.bind({});
Error.args = {
  variant: "error",
  copy: "en",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  copy: "en",
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  variant: "branded",
  dismissible: true,
  copy: "en",
};

export const OnDismiss = Template.bind({});
OnDismiss.args = {
  variant: "instructional",
  dismissible: true,
  onDismiss: () => alert("I was dismissed"),
  copy: "en",
};

export const OnExit = Template.bind({});
OnExit.args = {
  variant: "success",
  dismissible: true,
  onExit: () => alert("I have existed"),
  copy: "en",
};
