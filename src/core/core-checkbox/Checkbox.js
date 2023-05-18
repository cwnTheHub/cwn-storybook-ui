import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Box from "../core-box/Box";
import generateId from "../../utils/generateId";
import { safeRest } from "../../util-helpers";
import ColoredTextProvider from "../../utils/components/ColoredTextProvider/ColoredTextProvider";
import Text from "../core-text/Text";
import InputFeedback from "../core-input-feedback/InputFeedback";
import Paragraph from "../core-paragraph/Paragraph";
import {
  colorCardinal,
  colorWhite,
  colorGreyShuttle,
  colorGreyGainsboro,
  colorAccessibleGreen,
} from "../core-colours/colours";
import { borders } from "../../shared-styles";
import { Checkmark } from "../core-feedback-icon";

const ErrorText = styled(ColoredTextProvider)(({ isError }) => ({
  ...(isError && { color: colorCardinal }),
}));

const FakeCheckbox = styled.span({
  height: "1.25rem",
  width: "1.25rem",
  minHeight: "1.25rem",
  minWidth: "1.25rem",

  outline: 0,
  lineHeight: 0,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",

  marginTop: "0.125rem",

  transition: "border-color 0.1s linear, background-color 0.1s linear",
  ...borders.thin,
  ...borders.rounded,

  borderColor: colorGreyShuttle,
  backgroundColor: colorWhite,
  "& > i": {
    display: "none",
  },
});

const HiddenInput = styled.input({
  position: "absolute",
  width: "1.2rem",
  height: "1.2rem",
  margin: "2px 1px",
  opacity: "0",
  pointerEvents: "none",
});

const StyledLabel = styled.label(({ isError }) => ({
  display: "flex",
  cursor: "pointer",
  ...(isError && {
    [`div > ${FakeCheckbox}`]: {
      borderColor: colorCardinal,
    },
  }),
  [`${HiddenInput}:focus ~ & > div > ${FakeCheckbox}`]: {
    boxShadow: `0 0 4px 1px ${colorGreyShuttle}`,
    borderColor: isError ? colorCardinal : colorWhite,
  },
  [`${HiddenInput}:checked ~ & > div > ${FakeCheckbox}`]: {
    backgroundColor: colorAccessibleGreen,
    borderColor: colorAccessibleGreen,
    "& > i": {
      display: "block",
    },
  },
  [`${HiddenInput}:disabled ~ & > div > ${FakeCheckbox}`]: {
    backgroundColor: colorGreyGainsboro,
    borderColor: colorGreyGainsboro,
  },
  [`${HiddenInput}:disabled ~ & > div > div`]: {
    color: colorGreyGainsboro,
  },
}));

const CheckmarkContainer = styled.span({
  "& > svg": {
    "& > path": {
      fill: colorWhite,
    },
  },
});

const renderError = (error, errorId) => (
  <InputFeedback id={errorId} feedback="error">
    <Paragraph size="small">{error || ""}</Paragraph>
  </InputFeedback>
);

const getGeneratedId = (name, value) => {
  return generateId(name).postfix(value);
};
const getErrorId = (name, value, id) => {
  return generateId(id || getGeneratedId(name, value)).postfix("error-message");
};

const Checkbox = React.forwardRef(
  ({ id, name, value, label, feedback, error, ...rest }, ref) => (
    <Box between={2}>
      {feedback === "error" && renderError(error, getErrorId(name, value, id))}
      <HiddenInput
        type="checkbox"
        id={id || getGeneratedId(name, value)}
        name={name}
        value={value}
        aria-invalid={feedback === "error"}
        aria-describedby={
          feedback === "error" ? getErrorId(name, value, id) : undefined
        }
        data-testid="hidden-input"
        ref={ref}
        {...safeRest(rest)}
      />
      <StyledLabel
        isError={feedback === "error"}
        htmlFor={id || getGeneratedId(name, value)}
        data-testid="checkbox-label"
      >
        <Box between={3} inline>
          <FakeCheckbox data-testid="fake-input">
            <CheckmarkContainer id="checkmark">
              <Checkmark />
            </CheckmarkContainer>
          </FakeCheckbox>
          <ErrorText isError={feedback === "error"}>
            <Text>{label}</Text>
          </ErrorText>
        </Box>
      </StyledLabel>
    </Box>
  )
);

Checkbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string,
  feedback: PropTypes.oneOf(["error"]),
  error: PropTypes.string,
};

Checkbox.defaultProps = {
  id: undefined,
  feedback: undefined,
  error: undefined,
  checked: undefined,
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
