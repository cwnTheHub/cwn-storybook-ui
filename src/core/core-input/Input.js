import React, { useState } from "react";
import PropTypes from "prop-types";

import Box from "../core-box/Box";
import InputFeedback from "../core-input-feedback/InputFeedback";
import Text from "../core-text/Text";
import Paragraph from "../core-paragraph/Paragraph";
import { safeRest } from "../../util-helpers";
import FeedbackIcon from "./FeedbackIcon";
import {
  StyledFeedbackIcon,
  StyledInput,
  StyledLabelContainer,
} from "./styles";
import generateId from "../../utils/generateId";
import { componentWithName } from "../../util-prop-types";

const showFeedbackIcon = (feedback) =>
  feedback === "error" || feedback === "success";
const renderHint = (hint, Component, id) => (
  <Component id={id} size="small">
    {hint}
  </Component>
);
const renderError = (error, errorId) => (
  <InputFeedback id={errorId} feedback="error">
    <Paragraph size="small">{error}</Paragraph>
  </InputFeedback>
);
const renderLabel = (id, label, hint, hintPosition, hintId, tooltip) => (
  <div>
    <Box inline between={2}>
      <label htmlFor={id || generateId(label).identity()}>
        <StyledLabelContainer inline tag="span" between={2}>
          <Text size="medium" bold>
            {label}
          </Text>
          {hint && hintPosition === "inline" && renderHint(hint, Text, hintId)}
        </StyledLabelContainer>
      </label>
      {tooltip && React.cloneElement(tooltip, { connectedFieldLabel: label })}
    </Box>
    {hint && hintPosition === "below" && renderHint(hint, Paragraph, hintId)}
  </div>
);
const renderHelper = (helper, helperId, feedback, value) => {
  if (typeof helper === "function") {
    return (
      <div id={helperId}>
        <Text size="small">{helper(feedback, value)}</Text>
      </div>
    );
  }

  return (
    <InputFeedback id={helperId} feedback={feedback}>
      <Text size="small">{helper}</Text>
    </InputFeedback>
  );
};

const Input = React.forwardRef(
  (
    {
      id,
      value,
      type,
      label,
      hint,
      hintPosition,
      feedback,
      error,
      helper,
      tooltip,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const fieldId = generateId(id, rest.name, label);
    const errorId = error && fieldId.postfix("error-message");
    const helperId = helper && fieldId.postfix("helper");
    const hintId =
      (hint && hintPosition === "below" && fieldId.postfix("hint")) ||
      undefined;

    const handleFocus = (e) => {
      setIsFocused(true);
      if (rest.onFocus) {
        rest.onFocus(e);
      }
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (rest.onBlur) {
        rest.onBlur(e);
      }
    };

    const handleKeyDown = (e) => {
      /**
       * this is a workaround for a bug in chrome that moves
       * the cursor into a wrong position if prepended with a space
       */
      if (type === "email" && e.key === " ") {
        e.preventDefault();
      }

      if (rest.onKeyDown) {
        rest.onKeyDown(e);
      }
    };

    return (
      <Box between={2}>
        {renderLabel(
          fieldId.identity(),
          label,
          hint,
          hintPosition,
          hintId,
          tooltip
        )}
        {helper && renderHelper(helper, helperId, feedback, value)}
        {error && renderError(error, errorId)}
        <div css={{ position: "relative" }}>
          <StyledInput
            {...safeRest(rest)}
            type={type}
            ref={ref}
            id={fieldId.identity()}
            value={value}
            feedback={feedback}
            aria-invalid={feedback === "error"}
            aria-describedby={errorId || hintId || helperId || undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {!rest.disabled && (
            <StyledFeedbackIcon>
              <FeedbackIcon
                showIcon={showFeedbackIcon(feedback) && !isFocused}
                feedback={feedback}
              />
            </StyledFeedbackIcon>
          )}
        </div>
      </Box>
    );
  }
);
Input.displayName = "Input";

Input.propTypes = {
  id: PropTypes.string,

  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "email",
    "search",
    "tel",
    "url",
  ]),

  label: PropTypes.string.isRequired,

  hint: PropTypes.string,

  hintPosition: PropTypes.oneOf(["inline", "below"]),

  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  feedback: PropTypes.oneOf(["success", "error"]),

  error: PropTypes.node,

  helper: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

  tooltip: componentWithName("Tooltip", true),
};

Input.defaultProps = {
  id: undefined,
  type: "text",
  hint: undefined,
  hintPosition: "inline",
  value: undefined,
  feedback: undefined,
  error: undefined,
  tooltip: undefined,
  helper: undefined,
};

export default Input;
