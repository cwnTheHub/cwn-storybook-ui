import React from "react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => {
  const {
    ctaBgColor,
    ctaTxtColor,
    onClick,
    disabled,
    ctaHeight,
    ctaWidth,
    buttonTxt,
    variant,
  } = args;
  return (
    <Button
      ctaBgColor={ctaBgColor}
      ctaTxtColor={ctaTxtColor}
      onClick={onClick}
      disabled={disabled}
      ctaHeight={ctaHeight}
      ctaWidth={ctaWidth}
      buttonTxt={buttonTxt}
      variant={variant}
    />
  );
};

export const Regular = Template.bind({});
Regular.args = {
  variant: "regular",
  ctaBgColor: "green",
  ctaTxtColor: "white",
  onClick: () => console.log("click"),
  disabled: false,
  ctaWidth: "50%",
  buttonTxt: "Button",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outline",
  ctaBgColor: "green",
  ctaTxtColor: "white",
  onClick: () => console.log("click"),
  disabled: false,
  ctaWidth: "50%",
  buttonTxt: "Button",
};

export const Empty = Template.bind({});
Empty.args = {
  ctaBgColor: "green",
  ctaTxtColor: "white",
  onClick: () => console.log("click"),
  disabled: false,
  ctaWidth: "50%",
  buttonTxt: "Button",
};
