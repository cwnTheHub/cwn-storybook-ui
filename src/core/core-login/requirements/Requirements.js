import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "../../core-box/Box";
import { Requirement } from "../requirement/Requirement";
import FlexGrid from "../../core-flex-grid/FlexGrid";
import InputFeedback from "../../core-input-feedback/InputFeedback";

export const Requirements = ({ value, requirements, onValidChange }) => {
  const validChangeCb = useCallback(onValidChange, []);

  useEffect(() => {
    validChangeCb(requirements?.every((r) => r.validator(value)));
  }, [value, requirements, validChangeCb]);

  return (
    <InputFeedback>
      {requirements?.map((r, index) => (
        <Requirement
          key={index}
          value={value}
          requirement={r}
          onValidChange={onValidChange}
        />
      ))}
    </InputFeedback>
  );
};

Requirements.propTypes = {
  value: PropTypes.string,
  requirements: PropTypes.arrayOf(
    PropTypes.shape({
      validator: PropTypes.func,
      text: PropTypes.string,
    })
  ),

  onValidChange: PropTypes.func,
};
