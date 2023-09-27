import React from "react";

import { Link as ReactRouterLink } from "react-router-dom";

import A11yContent from "../../core/core-a11y-content/A11yContent";
import Box from "../../core/core-box/Box";
import { colorNemetonPurple } from "../../core/core-colours/colours";
import { Download, Settings } from "../../core/core-decorative-icon";
import {
  Delete,
  DownloadPDF,
  DownloadPDFs,
  Edit,
  LinkExternal,
  Print,
  Profile,
  Search,
} from "../../core/core-interactive-icon/svgs";
import Link from "../../core/core-link/Link";
import Paragraph from "../../core/core-paragraph/Paragraph";

export default {
  title: "Core components/Links / Link",
  component: Link,
};

const Template = (args) => {
  return (
    <Link
      reactRouterLinkComponent={args.reactRouterLinkComponent}
      to={args.to}
      href={args.href}
      invert={args.invert}
      forwardedRef={args.forwardedRef}
      icon={args.icon}
      iconPosition={args.iconPosition}
    >
      Go to the NDS homepage
    </Link>
  );
};
export const Primary = Template.bind({});
Primary.args = {
  reactRouterLinkComponent: null,
  to: null,
  href: "#",
  invert: undefined,
  forwardedRef: undefined,
  icon: undefined,
  iconPosition: "left",
};
export const MinimalUsage = (args) => {
  return (
    <Box between={3} inset={3}>
      <Paragraph size="large">
        <Link href="#">Go to the NDS homepage</Link>
      </Paragraph>

      <Paragraph size="medium">
        <Link href="#">Go to the NDS homepage</Link>
      </Paragraph>

      <Paragraph size="small">
        <Link href="#">Go to the NDS homepage</Link>
      </Paragraph>
    </Box>
  );
};

export const Inverted = (args) => {
  return (
    <div style={{ background: colorNemetonPurple, padding: 20 }}>
      <Box between={3} inset={3}>
        <Paragraph size="large" invert>
          <Link href="#" invert>
            Go to the NDS homepage
          </Link>
        </Paragraph>

        <Paragraph size="medium" invert>
          <Link href="#" invert>
            Go to the NDS homepage
          </Link>
        </Paragraph>

        <Paragraph size="small" invert>
          <Link href="#" invert>
            Go to the NDS homepage
          </Link>
        </Paragraph>
      </Box>
    </div>
  );
};

export const LinksWithIcons = (args) => {
  return (
    <div>
      <Box between={3}>
        <span>
          <Link href="#" icon={Delete} iconPosition="left">
            Delete
          </Link>
        </span>

        <span>
      <Link href="#" icon={Download} iconPosition="left">
        Download records
      </Link>
    </span>

    <span>
      <Link href="#" icon={DownloadPDF} iconPosition="left">
        January <A11yContent>PDF</A11yContent>
      </Link>
    </span>

    <span>
      <Link href="#" icon={DownloadPDFs} iconPosition="left">
        Download all 2019 bills
      </Link>
    </span>
        <span>
          <Link href="#" icon={Edit} iconPosition="left">
            Edit
          </Link>
        </span>

        <span>
          <Link
            href="#"
            icon={LinkExternal}
            iconPosition="left"
            target="_blank"
          >
            Find My Device <A11yContent>Opens in a new window</A11yContent>
          </Link>
        </span>
        <span>
      <Link href="#" icon={Print} iconPosition="left">
        Print
      </Link>
    </span>

    <span>
      <Link href="#" icon={Profile} iconPosition="left">
        Profile
      </Link>
    </span>

    <span>
      <Link href="#" icon={Settings} iconPosition="left">
        Settings
      </Link>
    </span>

    <span>
      <Link href="#" icon={Search} iconPosition="left">
        Search
      </Link>
    </span>
      </Box>
    </div>
  );
};

const LinkWrapper = ({ ...rest }) => (
  <Link
    {...rest}
    reactRouterLinkComponent={rest.to ? ReactRouterLink : undefined}
  />
);
export const WithRouterLink = (args) => {
  return <LinkWrapper to="/more">Read More</LinkWrapper>;
};
