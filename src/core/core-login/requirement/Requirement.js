import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Checkmark, Times } from "../../core-feedback-icon";
import Text from "../../core-text/Text";
import InputFeedback from "../../core-input-feedback/InputFeedback";
import Box from "../../core-box/Box";

export const Requirement = ({ value, requirement }) => {
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    setIsValid(requirement.validator(value));
  }, [value, requirement]);

  return (
    
      <Box inline between={2}>
        {isValid ? <Checkmark /> : <Times />}
        <Text>{requirement.text}</Text>
      </Box>
  );
};
Requirement.propTypes = {
  value: PropTypes.string,
  requirement: PropTypes.shape({
    validator: PropTypes.func,
    text: PropTypes.string,
  }),
};
