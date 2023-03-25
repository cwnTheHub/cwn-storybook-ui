import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input/Input";
import { AddressAutoCompleteDropdown, Line } from "./AddressAutoCompleteStyles";
import { FaSpinner } from "react-icons/fa";

const AddressAutoComplete = ({
  placeholder,
  icon,
  label,
  onChange,
  textColor,
  disabled,
  type = "text",
  required,
  results,
  handleDropdownItemClick,
  showSpinner,
  selectedValue,
  errorMessage,
  ...rest
}) => {
  const [value, setValue] = useState(rest?.value || "");
  const [danger, setDanger] = useState(false);

  const renderSpinner = () => {
    if (
      value?.length > 1 &&
      showSpinner &&
      !errorMessage?.message &&
      !results
    ) {
      return <FaSpinner />;
    } else if (errorMessage?.message) {
      setDanger(true);
    } else {
      return icon;
    }
  };
  const handleChange = (ev) => {
    setValue(ev);
    onChange(ev);
  };

  return (
    <>
      <div style={{ width: "100%", position: "relative" }}>
        <Input
          type={type}
          placeholder={placeholder}
          required={required}
          color={textColor}
          label={label}
          disabled={disabled}
          danger={danger}
          icon={renderSpinner()}
          errorMessage={errorMessage}
          value={
            selectedValue?.city?.length
              ? `${selectedValue?.city}, ${selectedValue?.country}`
              : value
          }
          onChange={handleChange}
        />
      </div>
      {results && value && (
        <AddressAutoCompleteDropdown data-testid="AddressAutoCompleteDropdown">
          {results?.map((item, key) => (
            <Line
              key={key}
              onClick={() => handleDropdownItemClick(item)}
              data-testid="AddressAutoCompleteResult"
            >
              <span>
                {item?.aptNumber}-{item?.streetNumber} {item?.streetName}
              </span>
              <span>
                <strong>
                  {item?.province}
                  {", "}
                  {item?.country}
                </strong>
              </span>
            </Line>
          ))}
        </AddressAutoCompleteDropdown>
      )}
    </>
  );
};

AddressAutoComplete.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  handleFocus: PropTypes.func,
  type: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
  handleDropdownItemClick: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
  dropdownVisible: PropTypes.bool,
  className: PropTypes.string,
};

export default AddressAutoComplete;
