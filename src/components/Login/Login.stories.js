import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default {
  title: "Login compnent",
  component: Login,
};

const Template = (args) => {
  return (
    <Login
      loginHeading={args.loginHeading}
      txtColor={args.txtColor}
      loginEmailLabel={args.loginEmailLabel}
      loginEmailErrorMessage={args.loginEmailErrorMessage}
      loginForgotEmailLinkCTA={args.loginForgotEmailLinkCTA}
      loginEmailHandleChange={args.loginEmailHandleChange}
      loginPwdLabel={args.loginPwdLabel}
      loginPwdErrorMessage={args.loginPwdErrorMessage}
      loginForgotPwdLinkCTA={args.loginForgotPwdLinkCTA}
      loginPwdHandleChange={args.loginPwdHandleChange}
      loginSecureCodeLabel={args.loginSecureCodeLabel}
      loginSecureCodeErrorMessage={args.loginSecureCodeErrorMessage}
      loginSecureCodeHandleChange={args.loginSecureCodeHandleChange}
      loginBtnCTATxt={args.loginBtnCTATxt}
      loginBtnCTATxtColor={args.loginBtnCTATxtColor}
      loginBtnCTABgColor={args.loginBtnCTABgColor}
      loginBtnCTAHandleClick={args.loginBtnCTAHandleClick}
      loginBtnCTADisable={args.loginBtnCTADisable}
      loginBtnCTAWidth={args.loginBtnCTAWidth}
      loginBtnCTAHeight={args.loginBtnCTAHeight}
      required={args.required}
      showConnectWithoutPwd={args.showConnectWithoutPwd}
      isSecureByCode={args.isSecureByCode}
      accountFoundResponse={args.accountFoundResponse}
      loginHeadingRight={args.loginHeadingRight}
      loginSubHeadingRight={args.loginSubHeadingRight}
    />
  );
};

export const LoginWithSide = Template.bind({});
LoginWithSide.args = {
  loginHeading: "Log in to My Nemeton",
  txtColor: "green",
  loginEmailLabel: "Email/Username",
  loginEmailErrorMessage: "Please fill out this field",
  loginForgotEmailLinkCTA: <Link to={"#"}>Forgot your username?</Link>,
  loginEmailHandleChange: (param) => console.log(param),
  loginPwdLabel: "Password",
  loginPwdErrorMessage: "Please fill out this field",
  loginForgotPwdLinkCTA: "Forgot your password?",
  loginPwdHandleChange: (param) => console.log(param),
  loginSecureCodeLabel: "Security code",
  loginSecureCodeErrorMessage: "Please fill out this field",
  loginSecureCodeHandleChange: (param) => console.log(param),
  loginBtnCTATxt: "Log in",
  loginBtnCTATxtColor: "#FFFFFF",
  loginBtnCTABgColor: "green",
  loginBtnCTAHandleClick: (param) => console.log(param),
  loginBtnCTADisable: false,
  loginBtnCTAWidth: "",
  loginBtnCTAHeight: "",

  loginHeadingRight:"Tired of remembering passwords? Log in without one.",
  loginSubHeadingRight:"Get an email with a link that instantly and securely logs you into your account.",
  required: true,
  showConnectWithoutPwd: true,
  isSecureByCode: true,
  accountFoundResponse: true,
};
