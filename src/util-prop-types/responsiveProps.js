import PropTypes from "prop-types";

export default function responsiveProps(type) {
  return PropTypes.oneOfType([
    type,
    PropTypes.shape({
      xs: type,
      sm: type,
      md: type,
      lg: type,
      xl: type,
    }),
  ]);
}
