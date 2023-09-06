import React from "react";
import NavigationSubMenu from "../../core/core-navigation/NavigationSubMenu";

export default {
  title: "Navigation/dropdown Menu",
  Component: NavigationSubMenu,
};

const Template = (args) => {
  return (
    <NavigationSubMenu {...args}>Go to the NDS homepage</NavigationSubMenu>
  );
};

export const PropsAndMethods = Template.bind({});
PropsAndMethods.args = {
  variant: "primary",
  reactRouterLinkComponent: null,
  to: null,
  href: null,
};
