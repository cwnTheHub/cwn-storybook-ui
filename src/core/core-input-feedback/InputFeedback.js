import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { borders, messaging } from "../../shared-styles";
import Box from "../core-box/Box";
import { safeRest } from "../../util-helpers";

const StyledFeedback = styled(({ feedback, ...rest }) => <Box {...rest} />)(
  ({ feedback }) => ({
    ...borders.rounded,
    ...(feedback === "success" && messaging.success),
    ...(feedback === "error" && messaging.error),
    ...(feedback === undefined && messaging.standard),
  })
);

const InputFeedback = ({ feedback, children, ...rest }) => (
  <StyledFeedback
    {...safeRest(rest)}
    inset={3}
    role={feedback === "error" ? "alert" : null}
    feedback={feedback}
  >
    {children}
  </StyledFeedback>
);

InputFeedback.propTypes = {
  feedback: PropTypes.oneOf(["success", "error"]),
  children: PropTypes.node.isRequired,
};

InputFeedback.defaultProps = {
  feedback: undefined,
};

export default InputFeedback;
