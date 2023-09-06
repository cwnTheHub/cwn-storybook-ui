import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { safeRest } from "../../util-helpers";
import Link from "../core-link/Link";

const NavigationItem = ({ ...rest }) => (
  <Link
    {...safeRest(rest)}
    reactRouterLinkComponent={rest.to ? ReactRouterLink : undefined}
  />
);

NavigationItem.displayName = "NavigationItem";
export default NavigationItem;
