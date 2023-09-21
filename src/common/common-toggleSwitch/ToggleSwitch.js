import React, { useState, useRef, useImperativeHandle, useEffect } from "react";
import PropTypes from "prop-types";

import { StyledLabel, Button, Slider, InputSwitchWrapper } from "./styles";
import { warn } from "../../utils/warn";
import Spinner from "../../core/core-spinner/Spinner";
import Tooltip from "../../core/core-tooltip/Tooltip";
import Box from "../../core/core-box/Box";
import Text from "../../core/core-text/Text";
import { safeRest } from "../../util-helpers";

const ToggleSwitch = React.forwardRef(
  (
    {
      id,
      label,
      tooltipText,
      checked,
      onClick,
      tooltipCopy,
      spinnerLabel,
      isLoading,
      ...rest
    },
    ref
  ) => {
    if (tooltipText && !tooltipCopy) {
      warn(
        "@nds-core/toggle-switch",
        "You must provide tooltipCopy when using tooltipText"
      );
    }
    if (isLoading && !spinnerLabel) {
      warn(
        "@nds-core/toggle-switch",
        "You must provide spinnerLabel when using isLoading"
      );
    }
    const labelledById = `${id}-label`;
    const buttonRef = useRef();

    // Internal state to manage visual appearance of toggle while the user supplies the true checked status
    const [_isChecked, _setIsChecked] = useState(checked);

    useEffect(() => {
      if (_setIsChecked) {
        _setIsChecked(checked);
      }
    }, [checked]);

    const _onClick = (event) => {
      _setIsChecked(!_isChecked);

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onClick(event);
      } else {
        setTimeout(() => {
          onClick(event);
        }, 250);
      }
    };

    /* The purpose of this hook is to allow the parent
    to focus on the ToggleSwitch at will by forwarding
    a ref to parent and exposing ONLY a single `focus` method
  */
    useImperativeHandle(ref, () => ({
      focus: () => {
        buttonRef.current.focus();
      },
    }));

    const handleTooltipClick = (event) => {
      event.preventDefault();
    };

    return (
      <StyledLabel htmlFor={id}>
        <Box inline between={2}>
          <Text id={labelledById} size="medium">
            {label}
          </Text>
          {tooltipText && tooltipCopy && (
            <Tooltip onClick={handleTooltipClick} copy={tooltipCopy}>
              {tooltipText}
            </Tooltip>
          )}
        </Box>
        <InputSwitchWrapper>
          <Spinner
            tag="span"
            spinning={isLoading}
            label={spinnerLabel}
            size="small"
            inline
          >
            <Button
              {...safeRest(rest)}
              id={id}
              role="switch"
              aria-checked={checked}
              aria-labelledby={labelledById}
              data-testid={`${id}-switch`}
              onClick={!isLoading ? _onClick : null}
              ref={buttonRef}
            >
              <Slider pressed={_isChecked} />
            </Button>
          </Spinner>
        </InputSwitchWrapper>
      </StyledLabel>
    );
  }
);

ToggleSwitch.displayName = "ToggleSwitch";

ToggleSwitch.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  checked: PropTypes.bool,

  tooltipText: PropTypes.string,

  tooltipCopy: PropTypes.string,

  spinnerLabel: PropTypes.string,

  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

ToggleSwitch.defaultProps = {
  checked: false,
  tooltipText: undefined,
  tooltipCopy: undefined,
  spinnerLabel: "toggle",
  isLoading: false,
};

export default ToggleSwitch;
