import React from "react";
import HeaderTitle from "./HeaderTitle";

export default {
  title: " Header title",
  component: HeaderTitle,
};

const Template = (args) => {
  return <HeaderTitle children={args.children} txtColor={args.txtColor} />;
};

export const Heading = Template.bind({});
Heading.args = {
  txtColor: "red",
  children: <h3>Open session</h3>,
};
export const HeadingBlank = Template.bind({});
HeadingBlank.args = {
  children: <span>Open session</span>,
};
