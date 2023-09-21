import React from "react";
import A11yContent from "../../core/core-a11y-content/A11yContent";
import ButtonLink from "../../core/core-button-link/ButtonLink";
import { colorNemetonPurple } from "../../core/core-colours/colours";

export default {
  title: "Core components/Links/ Button Link",
  component: ButtonLink,
};

const Template = (args) => {
  return (
    <ButtonLink
      variant={args.variant}
      rank={args.rank}
      reactRouterLinkComponent={args.reactRouterLinkComponent}
      to={args.to}
      href={args.href}
      fullWidth={args.fullWidth}
    >
      Find something
    </ButtonLink>
  );
};

export const MinimalUsage = Template.bind({});
MinimalUsage.args = {
  href: "#",
};

export const Inverted = (args) => {
  return (
    <div style={{ background: colorNemetonPurple, padding: 20 }}>
      <ButtonLink href="#" variant="inverted">
        Inverted Button link
      </ButtonLink>
    </div>
  );
};

export const WithA11yContent = (args) => {
  return (
    <ButtonLink href="#">
      <span>
        Button Link<A11yContent>with hidden content</A11yContent>
      </span>
    </ButtonLink>
  );
};
