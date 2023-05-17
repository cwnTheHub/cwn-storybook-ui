import React from "react";
import PropTypes from "prop-types";
import Media from "react-media";

import { breakpoints } from "./media";
import { warn } from "../../utils/warn";

const Responsive = ({ minWidth, maxWidth, query, children, ...rest }) => {
  if (!minWidth && !maxWidth) {
    warn("Responsive", "Responsive needs a minWidth or maxWith prop");
  }

  const mediaQuery = {};
  if (minWidth) {
    mediaQuery.minWidth = breakpoints[minWidth];
  }
  if (maxWidth) {
    mediaQuery.maxWidth = breakpoints[maxWidth] - 1;
  }

  return (
    <Media {...rest} query={{ ...mediaQuery, ...query }}>
      {children}
    </Media>
  );
};

Responsive.propTypes = {
  minWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  query: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Responsive.defaultProps = {
  minWidth: undefined,
  maxWidth: undefined,
  query: {},
  children: undefined,
};

export default Responsive;
