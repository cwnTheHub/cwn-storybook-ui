import React from "react";
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
      primary={args.primary}
      withArrow={args.withArrow}
      children={args.children}
      linkTxtColor={args.linkTxtColor}
      linkBackgroundColor={args.linkBackgroundColor}
      title={args.title}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: "le lien prim",
  color: "",
  hoverColor: "",
};
export const DropdownLink = Template.bind({});
DropdownLink.args = {
  dropdownLink: true,
  title: "le lien",
  linkTxtColor: "",
  linkBackgroundColor: "",
};
export const ButtonLink = Template.bind({});
ButtonLink.args = {
  button: true,
  title: "le lien",
  linkTxtColor: "",
  linkBackgroundColor: "",
};
export const DecoratedLink = Template.bind({});
DecoratedLink.args = {
  withArrow: true,
  title: "le lien",
  color: "",
  hoverColor: "",
};
