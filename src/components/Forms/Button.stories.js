import React from "react";
import Button from "../../core/core-button/Button";

export default {
  title: "Core components/Forms/Button",
  component: Button,
};

const Template = (args) => {
  return (
    <Button type={args.type} variant={args.variant} rank={args.rank}>
      {args.text}
    </Button>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  type: "button",
  variant: "primary",
  rank: "common",
  text: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "button",
  variant: "secondary",
  rank: "common",
  text: "Secondary",
};
export const BrandCommon = Template.bind({});
BrandCommon.args = {
  type: "button",
  variant: "brand",
  rank: "common",
  text: "Brand Common",
};
export const BrandMain = Template.bind({});
BrandMain.args = {
  type: "button",
  variant: "brand",
  rank: "main",
  text: "Brand Main",
};
export const Standard = Template.bind({});
Standard.args = {
  type: "button",
  variant: "standard",
  rank: "main",
  text: "Standard",
};
export const StandardMain = Template.bind({});
StandardMain.args = {
  type: "button",
  variant: "standard",
  rank: "main",
  text: "Standard Main",
};
export const StandardCommon = Template.bind({});
StandardCommon.args = {
  type: "button",
  variant: "standard",
  rank: "common",
  text: "Standard Common",
};

export const Inverted = Template.bind({});
Inverted.args = {
  type: "button",
  variant: "inverted",
  rank: "main",
  text: "Inverted",
};

export const Danger = Template.bind({});
Danger.args = {
  type: "button",
  variant: "danger",
  rank: "common",
  text: "Danger",
};
