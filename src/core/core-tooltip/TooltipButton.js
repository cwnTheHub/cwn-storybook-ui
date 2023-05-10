import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { buttons } from "../../shared-styles";
import { componentWithName } from "../../util-prop-types";
import A11yContent from "../core-a11y-content/A11yContent";

export const StyledIconButton = styled.button(buttons.noStyle);

const TooltipButton = forwardRef(
  ({ a11yText, inverted, onClick, icon: Icon }, ref) => {
    return (
      <StyledIconButton onClick={onClick} ref={ref} type="button">
        <A11yContent>{a11yText}</A11yContent>
        <Icon color={inverted ? "white" : "greyShark"} />
      </StyledIconButton>
    );
  }
);

TooltipButton.displayName = "TooltipButton";

TooltipButton.propTypes = {
  a11yText: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
  icon: componentWithName("QuestionMarkCircle").isRequired,
};

TooltipButton.defaultProps = {
  inverted: false,
  onClick: undefined,
};

export default TooltipButton;
