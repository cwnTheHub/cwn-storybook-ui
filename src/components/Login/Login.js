import React from "react";
import Box from "../Box/Box";
import Button from "../Button/Button";
import HBox from "../HBox/HBox";
import HeaderTitle from "../HeaderTitle/HeaderTitle";
import Input from "../Input/Input";
import VBox from "../VBox/VBox";
import { Line, LoginContainer, SubText, Text } from "./LoginStyles";

const Login = ({
  required,
  showConnectWithoutPwd,
  isSecureByCode,
  accountFoundResponse,

  loginHeading,
  txtColor,
  loginEmailLabel,
  loginEmailErrorMessage,
  loginForgotEmailLinkCTA,
  loginEmailHandleChange,
  loginPwdLabel,
  loginPwdErrorMessage,
  loginForgotPwdLinkCTA,
  loginPwdHandleChange,
  loginSecureCodeLabel,
  loginSecureCodeErrorMessage,
  loginSecureCodeHandleChange,
  loginBtnCTATxt,
  loginBtnCTATxtColor,
  loginBtnCTABgColor,
  loginBtnCTAHandleClick,
  loginBtnCTADisable,
  loginBtnCTAWidth,
  loginBtnCTAHeight,
  children,
}) => {
  return (
    <LoginContainer>
      <HBox>
        <VBox>
          <HeaderTitle txtColor={txtColor}>{loginHeading}</HeaderTitle>
          <VBox>
            <Input
              type="email"
              required={required}
              label={loginEmailLabel}
              onChange={loginEmailHandleChange}
              checkEmailValid={true}
              errorMessage={loginEmailErrorMessage}
              forgotUsername={loginForgotEmailLinkCTA}
            />
          </VBox>
          <VBox>
            <Input
              type="password"
              required={required}
              label={loginPwdLabel}
              onChange={loginPwdHandleChange}
              errorMessage={loginPwdErrorMessage}
              forgotPwd={loginForgotPwdLinkCTA}
            />
          </VBox>
          {isSecureByCode && accountFoundResponse && (
            <VBox>
              <Input
                type="text"
                required={required}
                label={loginSecureCodeLabel}
                onChange={loginSecureCodeHandleChange}
                errorMessage={loginSecureCodeErrorMessage}
              />
            </VBox>
          )}
          <VBox>
            <Button
              btnBackgroundColor={loginBtnCTABgColor}
              btnTxtColor={loginBtnCTATxtColor}
              onClick={loginBtnCTAHandleClick}
              disabled={loginBtnCTADisable}
              height={loginBtnCTAHeight}
              width={loginBtnCTAWidth}
              buttonTxt={loginBtnCTATxt}
            />
          </VBox>
        </VBox>
        {showConnectWithoutPwd && <Line />}
        {showConnectWithoutPwd && <VBox>{children}</VBox>}
      </HBox>
    </LoginContainer>
  );
};

export default Login;
