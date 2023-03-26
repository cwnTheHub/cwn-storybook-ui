import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VBox from "../VBox/VBox";
import {
  DangerIcon,
  DangerMessage,
  DetailIcon,
  EyeIcon,
  InputContainer,
  InputField,
  Label,
} from "./InputStyles";

const Input = ({
  type = "text",
  required,
  label,
  onChange,
  placeholder,
  errorMessage,
  icon,
  disabled,
  checkPasswordComplexity,
  checkEmailValid,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [checkPwdComplexity, setCheckPwdComplexity] = useState(true);
  const [value, setValue] = useState(rest?.value || "");

  const handleFocus = () => {
    setFocused(true);
  };
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*/]).{10,}$/;
    return regex.test(password);
  };

  const handleBlur = () => {
    setFocused(false);
    if (required && !value) {
      setError(errorMessage);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setValue(value);
    onChange(value);
    if (type === "email" && value && !validateEmail(value) & checkEmailValid) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    if (
      type === "password" &&
      value &&
      !validatePassword(value) & checkPasswordComplexity
    ) {
      setCheckPwdComplexity(false);
    } else {
      setCheckPwdComplexity(true);
    }

    if (required && !value) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderIcon = () => {
    if (
      type === "password" &&
      value &&
      !validatePassword(value) &&
      checkPasswordComplexity
    ) {
      return <DangerIcon data-testid="the-danger-icon" />;
    }
    if (type === "password") {
      return (
        <EyeIcon onClick={toggleShowPassword} data-testid="show-password-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </EyeIcon>
      );
    }
    if (type === "email" && value && !validateEmail(value) && checkEmailValid) {
      return <DangerIcon data-testid="the-danger-icon" />;
    }
    /* if (
      type === "password" &&
      value &&
      !validatePassword(value) &&
      checkPasswordComplexity
    ) {
      return <DangerIcon data-testid="the-danger-icon" />;
    } */

    return null;
  };
  const renderDangerIcon = () => {
    if (required && error && !focused) {
      return <DangerIcon data-testid="the-danger-icon" />;
    }
  };

  const renderDetailIcon = () => {
    if (icon) {
      return <DetailIcon data-testid="the-icon">{icon}</DetailIcon>;
    }
  };

  return (
    <VBox>
      {label && <Label data-testid="label">{label}</Label>}
      {required && error && !value && (
        <DangerMessage data-testid="error-message">{error}</DangerMessage>
      )}
      {!isEmailValid && !focused && (
        <DangerMessage data-testid="error-message">{error}</DangerMessage>
      )}
      {!checkPwdComplexity && !focused && (
        <DangerMessage data-testid="error-message">{error}</DangerMessage>
      )}
      <InputContainer data-testid="input-container">
        {icon && renderDetailIcon()}
        <InputField
          aria-label={label}
          type={type === "password" && showPassword ? "text" : type}
          required={required}
          onFocusCapture={handleFocus}
          onBlurCapture={handleBlur}
          focused={focused}
          disabled={disabled}
          danger={required && error && !value}
          onBlur={handleBlur}
          onChange={handleInputChange}
          value={value}
          placeholder={placeholder}
          icon={icon}
          {...rest}
          data-testid="input"
        />
        {!error && value && renderIcon()}
        {error && required && !value && !focused && renderDangerIcon()}
        {type === "email" &&
          value &&
          !validateEmail(value) &&
          checkEmailValid &&
          renderDangerIcon()}
      </InputContainer>
      {rest?.forgotUsername || rest?.forgotPwd ? (
        <Label data-testid="label">
          {rest?.forgotUsername || rest?.forgotPwd}
        </Label>
      ) : null}
    </VBox>
  );
};

export default Input;
