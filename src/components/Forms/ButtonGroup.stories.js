import React from "react";
import A11yContent from "../../core/core-a11y-content/A11yContent";
import ButtonGroup from "../../core/core-button-group/ButtonGroup";

export default {
  title: "Core components/Forms/ButtonGroup",
  component: ButtonGroup,
};

const Template = (args) => {
  return (
    <ButtonGroup name={args.name} label={args.label}>
      {args?.data?.map((item, index) => (
        <ButtonGroup.Item key={index} value={item?.value}>
          {item?.label}
          {args.a11y ? <A11yContent>{item?.label}</A11yContent> : null}
        </ButtonGroup.Item>
      ))}
    </ButtonGroup>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  data: [
    { value: "small", label: "SMALL" },
    { value: "medium", label: "MEDIUM" },
    { value: "large", label: "LARGE" },
  ],
  name: "storageSize",
  label: "Please select an option",
};

export const Secondary = Template.bind({});
Secondary.args = {
  data: [
    { value: "very small", label: "VERY SMALL" },
    { value: "very medium", label: "VERY MEDIUM" },
    { value: "very large", label: "VERY LARGE" },
  ],
  name: "storageSize",
  label: "Please select an option",
  a11y: true,
};
