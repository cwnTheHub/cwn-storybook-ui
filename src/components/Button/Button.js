import React from "react";
import PropTypes from "prop-types";
import { ButtonContainer, ButtonField } from "./styles";

const Button = ({
  variant,
  ctaBgColor,
  ctaTxtColor,
  onClick,
  disabled,
  buttonTxt,
  ctaWidth,
  ctaHeight,
}) => {
  return (
    <ButtonContainer data-testid="btn-container">
      <ButtonField
        data-testid="click-me"
        onClick={onClick}
        disabled={disabled}
        ctaBgColor={ctaBgColor}
        ctaTxtColor={ctaTxtColor}
        variant={variant}
        ctaWidth={ctaWidth}
        ctaHeight={ctaHeight}
      >
        {buttonTxt}
      </ButtonField>
    </ButtonContainer>
  );
};

Button.propTypes = {
  icon: PropTypes.element,
  ctaBgColor: PropTypes.string,
  ctaTxtColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonTxt: PropTypes.string,
  variant: PropTypes.string,
  ctaHeight: PropTypes.string,
  ctaWidth: PropTypes.string,
};

export default Button;
