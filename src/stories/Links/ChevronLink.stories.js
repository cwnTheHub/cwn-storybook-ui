import React from "react";
import A11yContent from "../../core/core-a11y-content/A11yContent";
import ChevronLink from "../../core/core-chevron-link/ChevronLink";
import { colorNemetonPurple } from "../../core/core-colours/colours";

export default {
  title: "Core components/Links/ChevronLink",
  component: ChevronLink,
};

const Template = (args) => {
  return (
    <ChevronLink
      variant={args.variant}
      direction={args.direction}
      reactRouterLinkComponent={args.reactRouterLinkComponent}
      to={args.to}
      href={args.href}
    >
      Go to the NDS homepage
    </ChevronLink>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  direction: "right",
  reactRouterLinkComponent: null,
  to: null,
  href: "#",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  direction: "right",
  reactRouterLinkComponent: null,
  to: null,
  href: "#",
};

export const Inverted = (args) => {
  return (
    <div style={{ background: colorNemetonPurple, padding: 20 }}>
      <ChevronLink href="#" variant="inverted">
        Find out how
      </ChevronLink>
    </div>
  );
};

export const WithBackNavigation = (args) => {
  return (
    <ChevronLink href="#" direction="left">
      Back to ...
    </ChevronLink>
  );
};

export const WithA11yContent = (args) => {
  return (
    <ChevronLink href="#">
      Discover <A11yContent>Plans</A11yContent>
    </ChevronLink>
  );
};
