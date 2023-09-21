import React from "react";
import A11yContent from "../../core/core-a11y-content/A11yContent";
import TextButton from "../../core/core-text-button/TextButton";

export default {
  title: "Core components/Forms/TextButton",
  component: TextButton,
};

const Template = (args) => {
  return <TextButton onClick={args.onClick}>Click me</TextButton>;
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  onClick: () =>
    alert(
      "This is where you could launch a modal, make an api call to delete or update something, etc."
    ),
};

export const WithA11ycontent = () => {
  return (
    <TextButton
      onClick={() =>
        alert(
          "This is where you could launch a modal, make an api call to delete or update something, etc."
        )
      }
    >
      <A11yContent>testing</A11yContent>
      With A11y Content
    </TextButton>
  );
};
