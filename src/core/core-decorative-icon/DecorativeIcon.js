import React from "react";
import PropTypes from "prop-types";
import Icon from "../../utils/components/Icon/Icon";

const DecorativeIcon = ({ symbol, variant, size, ...rest }) => {
  return (
    <Icon
      {...rest}
      symbol={symbol}
      variant={variant}
      size={size}
      aria-hidden="true"
    />
  );
};

DecorativeIcon.propTypes = {
  symbol: PropTypes.oneOf([
    "caretDown",
    "caretUp",
    "checkmark",
    "chevron",
    "leftChevron",
    "exclamationPointCircle",
    "expander",
    "hamburger",
    "location",
    "minus",
    "plus",
    "questionMarkCircle",
    "spyglass",
    "times",
  ]).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "inverted", "error"]),
  size: PropTypes.oneOf([16, 20, 24, 32, 48]),
};

DecorativeIcon.defaultProps = {
  variant: undefined,
  size: 24,
};

export default DecorativeIcon;
