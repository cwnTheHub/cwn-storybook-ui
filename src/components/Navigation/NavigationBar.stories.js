import React from "react";
import { Profile, QuestionMarkCircle } from "../../core/core-interactive-icon";
import NavigationBar from "../../core/core-navigation/NavigationBar";

export default {
  title: "Navigation/ Navigation Bar",
  component: NavigationBar,
};

const Template = (args) => {
  return <NavigationBar {...args} />;
};

export const Navigation = Template.bind({});
Navigation.args = {
  selectedId: null,
  onChange: (id, event) => console.log(`Selected id ${id}`, event),
  items: [
    {
      id: "1",
      label: "Login",
      to: "/login",
      icon: Profile,
      iconPosition: "left",
      isDisplayedInBottomBar: true,
    },
    {
      id: "2",
      label: "Support",
      href: "#",
      icon: QuestionMarkCircle,
      iconPosition: "left",
      isDisplayedInBottomBar: true,
    },
    {
      id: "3",
      label: "Language",
      onClick: (event) => console.log("Click event", event),
      dropdownRight:true,
      items: [
        {
          id: "3.1",
          label: "French",
          to: "/fr",
        },
        {
          id: "3.2",
          label: "English",
          to: "/en",
        },
      ],
    },
    {
      id: "4",
      label: "Location",
      onClick: (event) => console.log("Click event", event),
      dropdownRight:true,
      items: [
        {
          id: "4.1",
          label: "Maritime",
          href: "/maritime",
        },
        {
          id: "4.2",
          label: "Plateaux",
          href: "/plateaux",
        },
      ],
    },
  ],
};
