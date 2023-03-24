import React from "react";
import Navigation from "./Navigation";
import { FiUser, FiHelpCircle } from "react-icons/fi";

export default {
  title: "Navigation",
  component: Navigation,
};

const Template = (args) => {
  return (
    <Navigation
      bgColor={args.bgColor}
      responsiveBtnColor={args.responsiveBtnColor}
      top_links={args.top_links}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  bgColor: "",
  responsiveBtnColor: "",
  top_links: [
    {
      title: "Personal",
      to: "/toPersonal",
      logo: "NEMETON",
      menu_right: [
        { title: "Log in", to: "/toLogin", icon: <FiUser size={14} /> },
        {
          title: "Support",
          to: "/toSupport",
          icon: <FiHelpCircle size={14} />,
        },
        { title: "Language", to: "/toLanguage", type: "isDropdown" },
      ],
      menu_links: [
        { title: "Job Search", to: "/tochild1" },
        { title: "My Resume", to: "/tochild2", type: "isDropdown" },
        { title: "Health", to: "/tochild3", type: "isDropdown" },
        { title: "My NEMETON", to: "/tochild4" },
      ],
    },
    {
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
        {
          title: "Commercial",
          to: "/toCommercial",
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
        {
          title: "Partner Solutions",
          to: "/toPartner",
          logo: "NEMETON Partner Solutions",
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
            { title: "Language", to: "/toLanguage", type: "isDropdown" },
          ],
        },
      ],
      type: "isDropdown",
    },
    {
      title: "Health",
      to: "/toHealth",
      categories: [
        { title: "NEMETON Health", to: "/toSmallHe" },
        { title: "Care Centres", to: "/toCommercialHe" },
        { title: "Virtual Pharmacy", to: "/toPartnerHe" },
      ],
      type: "isDropdown",
    },
    { title: "Social Impact", to: "/toSocial" },
  ],
};
