import React from "react";
import { FiHelpCircle, FiUser } from "react-icons/fi";
import Link from "./Link";

export default {
  title: "Links",
  component: Link,
};

const Template = (args) => {
  return (
    <Link
      button={args.button}
      dropdownLink={args.dropdownLink}
      theLink={args.theLink}
      onClick={args.onClick}
    />
  );
};

export const DropdownLink = Template.bind({});
DropdownLink.args = {
  dropdownLink: true,
  onClick:(param)=>console.log(param),
  theLink: {
    title: "Business",
    to: "/toBusiness",
    categories: [
      {
        title: "Small & medium business",
        to: "/toSmall",
        logo: "NEMETON Business",
        menu_right: [
          {
            title: "Log in",
            to: "/toLogin",
            icon: <FiUser size={14} />,
            type: "isDropdown",
            categories: [
              {
                title: "My NEMETON",
                to: "/profile",
              },
              {
                title: "NEMETON Business Connect",
                to: "/businessConnect",
              },
              {
                title: "NewsLetter Marketplace",
                to: "/newletter",
              },
            ],
          },
          {
            title: "Support",
            to: "/toSupport",
            icon: <FiHelpCircle size={14} />,
          },
          { title: "Language", to: "/toLanguage", type: "isDropdown" },
        ],
      },
    ],
    type: "isDropdown",
  },
};
