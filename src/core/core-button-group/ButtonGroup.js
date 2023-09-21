import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Box from "../core-box/Box";
import Text from "../core-text/Text";
import { componentWithName } from "../../util-prop-types";
import { safeRest } from "../../util-helpers";
import ButtonGroupItem from "./ButtonGroupItem/ButtonGroupItem";

const StyledButtonGroup = styled(Box)({
  flexFlow: "row wrap",
  maxWidth: "784px",
});

const ButtonGroup = React.forwardRef(
  (
    {
      name,
      onChange,
      onFocus,
      onBlur,
      value,
      label,
      children,
      readOnly,
      showFieldset,
      ...rest
    },
    ref
  ) => {
    const passedButtons = React.Children.map(children, (child) =>
      React.cloneElement(child, {
        name,
        onChange,
        onFocus,
        onBlur,
        checked:
          typeof value !== "undefined"
            ? value === child.props.value
            : undefined,
        readOnly,
      })
    );

    const buttonValues = [];
    Object.keys(passedButtons).forEach((key) => {
      buttonValues.push(passedButtons[key].props.value);
    });
    if (!showFieldset) {
      return (
        <Box between={2}>
          <Text bold size="medium">
            {label}
          </Text>
          <StyledButtonGroup between={3} inline>
            {passedButtons}
          </StyledButtonGroup>
        </Box>
      );
    }
    return (
      <fieldset {...safeRest(rest)} name={name} ref={ref}>
        <legend>
          <Text bold size="medium">
            {label}
          </Text>
        </legend>

        <StyledButtonGroup between={3} inline>
          {passedButtons}
        </StyledButtonGroup>
      </fieldset>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

ButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  showFieldset: PropTypes.bool,
  children: componentWithName("ButtonGroup.Item", true).isRequired,
};

ButtonGroup.defaultProps = {
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  value: undefined,
  readOnly: undefined,
  showFieldset: false,
};

ButtonGroup.Item = ButtonGroupItem;

export default ButtonGroup;
