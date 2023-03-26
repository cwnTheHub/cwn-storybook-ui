import React from "react";
import PropTypes from "prop-types";
import { ButtonContainer, ButtonField } from "./ButtonStyles";

const Button = ({
  outlined,
  btnBackgroundColor,
  btnTxtColor,
  onClick,
  disabled,
  buttonTxt
}) => {
  return (
    <ButtonContainer>
      <ButtonField
        data-testid="Click Me"
        onClick={onClick}
        disabled={disabled}
        btnBackgroundColor={btnBackgroundColor}
        btnTxtColor={btnTxtColor}
        outlined={outlined}
      >
        {buttonTxt}
      </ButtonField>
    </ButtonContainer>
  );
};

Button.propTypes = {
  icon: PropTypes.element,
  backgroundColor: PropTypes.string,
  btnTxtColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonTxt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Button;

