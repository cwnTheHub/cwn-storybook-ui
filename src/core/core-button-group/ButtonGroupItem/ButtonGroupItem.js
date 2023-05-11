import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { componentWithName, or } from "../../../util-prop-types";
import { borders, forms } from "../../../shared-styles";
import { boldFont, medium } from "../../../shared-typography/typography";
import media from "../../core-responsive/media";
import { colorNemetonPurple, colorWhite } from "../../core-colours/colours";
import { safeRest } from "../../../util-helpers";
import generateId from "../../../utils/generateId";

const StyledButtonGroupItem = styled.div({
  margin: "0.5rem 0",
});
const StyledInput = styled.input({
  position: "absolute",
  opacity: "0",
  "&:checked ~ label": {
    backgroundColor: colorNemetonPurple,
    boxShadow: `0px 0px 0px 0px ${colorNemetonPurple}`,
    color: colorWhite,
  },
  "&:focus ~ label": {
    boxShadow: `0px 0px 0px 2px ${colorNemetonPurple}, 0px 0px 8px 1px ${colorNemetonPurple}`,
  },
});
const StyledLabel = styled.label(
  borders.none,
  borders.rounded,
  medium,
  boldFont,
  forms.font,
  forms.baseButton,
  {
    transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
    backgroundColor: colorWhite,
    boxShadow: `0px 0px 0px 1px ${colorNemetonPurple}`,
    color: colorNemetonPurple,
    whiteSpace: "nowrap",
    minWidth: "136px",
    "&:hover": {
      backgroundColor: colorWhite,
      color: colorNemetonPurple,
      boxShadow: `0px 0px 0px 2px ${colorNemetonPurple}, 0px 0px 8px 1px ${colorNemetonPurple}`,
    },
    ...media.from("md").css({
      minWidth: "136px",
    }),
  }
);

const ButtonGroupItem = React.forwardRef(
  (
    {
      name,
      value,
      checked,
      onChange,
      onFocus,
      onBlur,
      children,
      defaultChecked,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const itemId = generateId(name).postfix(value);
    return (
      <StyledButtonGroupItem {...safeRest(rest)}>
        <StyledInput
          id={itemId}
          name={name}
          value={value}
          type="radio"
          checked={checked}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          defaultChecked={defaultChecked}
          readOnly={readOnly}
          ref={ref}
        />
        <StyledLabel htmlFor={itemId}>{children}</StyledLabel>
      </StyledButtonGroupItem>
    );
  }
);

ButtonGroupItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  defaultChecked: PropTypes.bool,
  readOnly: PropTypes.bool,

  children: or([PropTypes.string, componentWithName("A11yContent")]).isRequired,
};

ButtonGroupItem.defaultProps = {
  checked: undefined,
  name: undefined,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  defaultChecked: undefined,
  readOnly: undefined,
};

ButtonGroupItem.displayName = "ButtonGroup.Item";

export default ButtonGroupItem;
