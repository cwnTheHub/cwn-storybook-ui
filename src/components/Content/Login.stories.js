import React from "react";
import { BenefitWithHeading } from "../../core/core-benefit";
import Box from "../../core/core-box/Box";
import Button from "../../core/core-button/Button";
import Card from "../../core/core-card/Card";
import ChevronLink from "../../core/core-chevron-link/ChevronLink";
import { DataLimit, Speed } from "../../core/core-decorative-icon";
import { FlexGrid } from "../../core/core-flex-grid";
import HairlineDivider from "../../core/core-hairline-divider/HairlineDivider";
import Heading from "../../core/core-heading/Heading";
import { Input } from "../../core/core-input";
import Login from "../../core/core-login/Login";
import Text from "../../core/core-text/Text";

export default {
  title: "Content/ Login",
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
