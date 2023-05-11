import React from "react";
import Button from "../../core/core-button/Button";

export default {
  title: "Forms/Button",
  component: Button,
};

const Template = (args) => {
  return (
    <Button type={args.type} variant={args.variant} rank={args.rank}>
      Button
    </Button>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  type: "button",
  variant: "primary",
  rank: "common",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "button",
  variant: "secondary",
  rank: "common",
};
export const BrandCommon = Template.bind({});
BrandCommon.args = {
  type: "button",
  variant: "brand",
  rank: "common",
};
export const BrandMain = Template.bind({});
BrandMain.args = {
  type: "button",
  variant: "brand",
  rank: "main",
};
export const Standard = Template.bind({});
Standard.args = {
  type: "button",
  variant: "standard",
  rank: "main",
};

export const Inverted = Template.bind({});
Inverted.args = {
  type: "button",
  variant: "inverted",
  rank: "main",
};
export const DangerMain = Template.bind({});
DangerMain.args = {
  type: "button",
  variant: "danger",
  rank: "main",
};
export const DangerCommon = Template.bind({});
DangerCommon.args = {
  type: "button",
  variant: "danger",
  rank: "common",
};