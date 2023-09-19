import React from "react";
import Login from "../core/core-login/Login";

export default {
  title: "Composite components/ Login",
  component: Login,
};

const Template = (args) => {
  return <Login {...args} />;
};

export const Demo = Template.bind({});

export const RegularUser = Template.bind({});
RegularUser.args = {
  variantType: "regular",
  cardVariant:"defaultWithBorder",
  copy: "en",
  fullHeight: false,
  checkUsernameOrEmailExists: () => {},
  sentLoginData: () => {},
  send2FALoginData: () => {},
  policies: {
    en: [
      {
        text: "Terms",
        linkTo: "#",
      },
      {
        text: "Cookie",
        linkTo: "#",
      },
      {
        text: "Privacy",
        linkTo: "#",
      },
    ],
    fr: [
      {
        text: "Conditions",
        linkTo: "#",
      },
      {
        text: " Cookies",
        linkTo: "#",
      },
      {
        text: "Confidentialité",
        linkTo: "#",
      },
    ],
  },
};

export const InHouseUser = Template.bind({});
InHouseUser.args = {
  variantType: "inHouse",
  cardVariant:"defaultWithBorder",
  copy: "en",
  fullHeight: false,
  checkUsernameOrEmailExists: () => {},
  sentLoginData: () => {},
  send2FALoginData: () => {},
  policies: {
    en: [
      {
        text: "Terms",
        linkTo: "#",
      },
      {
        text: "Cookie",
        linkTo: "#",
      },
      {
        text: "Privacy",
        linkTo: "#",
      },
    ],
    fr: [
      {
        text: "Conditions",
        linkTo: "#",
      },
      {
        text: " Cookies",
        linkTo: "#",
      },
      {
        text: "Confidentialité",
        linkTo: "#",
      },
    ],
  },
};
