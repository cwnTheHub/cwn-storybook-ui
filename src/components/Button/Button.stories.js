import React from "react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args) => {
  const {
    btnBackgroundColor,
    btnTxtColor,
    onClick,
    disabled,
    height,
    width,
    buttonTxt,
  } = args;
  return (
    <Button
      btnBackgroundColor={btnBackgroundColor}
      btnTxtColor={btnTxtColor}
      onClick={onClick}
      disabled={disabled}
      height={height}
      width={width}
      buttonTxt={buttonTxt}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  btnBackgroundColor: "green",
  btnTxtColor: "white",
  onClick: () => console.log("click"),
  disabled: false,
  height: "50px",
  width: "250px",
  buttonTxt: "Button",
};
