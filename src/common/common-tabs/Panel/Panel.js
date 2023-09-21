import React from "react";
import PropTypes from "prop-types";
import safeRest from "../../../util-helpers/safeRest";

const Panel = ({ children, ...rest }) => (
  <div {...safeRest(rest)}>{children}</div>
);

Panel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Panel;
