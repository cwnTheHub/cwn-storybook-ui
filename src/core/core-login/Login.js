import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Box from "../core-box/Box";
import Button from "../core-button/Button";
import Card from "../core-card/Card";
import ChevronLink from "../core-chevron-link/ChevronLink";
import FlexGrid from "../core-flex-grid/FlexGrid";
import HairlineDivider from "../core-hairline-divider/HairlineDivider";
import Heading from "../core-heading/Heading";
import Input from "../core-input/Input";
import Link from "../core-link/Link";
import Paragraph from "../core-paragraph/Paragraph";
import Text from "../core-text/Text";
import { Requirements } from "./requirements/Requirements";
import { getCopy } from "../../util-helpers";
import copyDictionary from "./LoginText";
import Spinner from "../core-spinner/Spinner";
import Notification from "../core-notification/Notification";

const Login = ({
  variant,
  checkUsernameOrEmailExists,
  sentLoginData,
  send2FALoginData,
  copy,
  policies,
}) => {
  const [username, setUsername] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [usernameIsCkecked, setUsernameIsChecked] = useState(false);
  const [error, setError] = useState(undefined);
  const [status, setStatus] = useState(undefined);

  const [password, setPassword] = useState("");
  const [statusPwd, setStatusPwd] = useState(undefined);
  const [errorPwd, setErrorPwd] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusConfirmPwd, setStatusConfirmPwd] = useState(undefined);
  const [errorConfirmPwd, setErrorConfirmPwd] = useState(undefined);
  const [isValid, setValid] = useState(false);

  const [secureCode, setSecureCode] = useState("");
  const [statusSecureCode, setStatusSecureCode] = useState(undefined);
  const [errorSecureCode, setErrorSecureCode] = useState(undefined);

  const [email, setEmail] = useState("");
  const [statusEmail, setStatusEmail] = useState(undefined);
  const [errorEmail, setErrorEmail] = useState(undefined);

  const [has2FALoading, setHas2FALoading] = useState(false);
  const [has2FA, setHas2FA] = useState(false);

  const [userNotExistAndContinueToRegister, setNextStep] = useState(false);

  const [errorMessage, setErrorMessage] = useState({});

  const content = getCopy(copyDictionary, copy);
  const contentPolicies = getCopy(policies, copy);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const passwordRequirements = [
    {
      text: "Must be at least 8 characters",
      validator: (val) => val.length >= 8,
    },
    {
      text: "Must contain at least one number",
      validator: (val) => /\d/g.test(val),
    },
    {
      text: "Must contain at least one lower-case letter",
      validator: (val) => /[a-z]/g.test(val),
    },
    {
      text: "Must contain at least one upper-case letter",
      validator: (val) => /[A-Z]/g.test(val),
    },
    {
      text: "Must contain at least one special character (@$%!#)",
      validator: (val) => /[@$%!#]/g.test(val),
    },
  ];

  const onDataFilling = (e) => {
    let text = e?.target?.name;
    switch (text) {
      case "username":
        setUsername(e.target.value);
        if (username.length > 3) {
          setError(undefined);
          setStatus(undefined);
        }
        break;
      case "password":
        setPassword(e.target.value);
        if (password?.length > 0 && password.length < 8) {
          setValid(false);
          setErrorPwd(undefined);
        } else if (isValid) {
          setErrorPwd(undefined);
          setStatusPwd(undefined);
        }
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        if (emailPattern.test(email)) {
          setStatusEmail(undefined);
          setErrorEmail(undefined);
        }
        break;
      case "secureCode":
        setSecureCode(e.target.value);
        break;
      default:
    }
  };

  const validate = (event) => {
    const value = event.target.value;
    let text = event?.target?.name;
    switch (text) {
      case "username":
        if (value.length <= 3) {
          setError(content?.emptyField);
          setStatus("error");
          setUserExists(false);
        } else {
          setError(undefined);
          setStatus(undefined);
          const response = checkUsernameOrEmailExists(username);
          setUserExists(response);
          if (response != undefined) {
            setUsernameIsChecked(true);
          }
        }
        break;
      case "email":
        if (!emailPattern.test(email)) {
          setStatusEmail("error");
          setErrorEmail("Incorect email formatting !");
        } else {
          setStatusEmail(undefined);
          setErrorEmail(undefined);
        }
        break;
      case "password":
        if (!value.length) {
          setErrorPwd(content?.emptyField);
          setStatusPwd("error");
        } else {
          setErrorPwd(undefined);
          setStatusPwd(undefined);
        }
        break;
      case "confirmPassword":
        if (confirmPassword != password) {
          setStatusConfirmPwd("error");
        } else {
          setStatusConfirmPwd(undefined);
        }
        break;
      default:
    }
  };

  const continueCTA = (e) => {
    e.preventDefault();
    setNextStep(true);
  };

  const signUpCTA = (e) => {
    e.preventDefault();
  };

  const signInCTA = async (e) => {
    e.preventDefault();
    if (password.length < 1) {
      setErrorPwd(content?.emptyField);
      setStatusPwd("error");
    } else if (username.length && password.length) {
      setHas2FALoading(true);
      const response = await sentLoginData({ username, password });
      if (response != undefined) {
        setHas2FALoading(false);
        setHas2FA(response.res);
        setErrorMessage(response?.message);
      }
    }
  };

  const renderGeneralError = () => {
    if (errorMessage?.status >= 200 && errorMessage?.status <= 299) {
      return (
        <Notification variant="success" copy={copy}>
          <Text bold> {errorMessage?.message}</Text>
        </Notification>
      );
    } else if (errorMessage?.status >= 400 && errorMessage?.status <= 499) {
      return (
        <Notification variant="error" copy={copy}>
          <Text bold> {errorMessage?.message}</Text>
        </Notification>
      );
    } else {
      return (
        <Notification variant="warning" copy={copy}>
          <Text bold> {content?.error500}</Text>
        </Notification>
      );
    }
  };

  const submitSecureCodeCTA = async (e) => {
    e.preventDefault();
    // send details
    if (secureCode.length < 6 && secureCode > 6) {
      setErrorSecureCode("Code invalid");
      setStatusSecureCode("error");
    } else {
      const response = await send2FALoginData({
        username,
        password,
        secureCode,
      });
      if (response != undefined && response) {
        setErrorSecureCode(undefined);
        setStatusSecureCode("success");
        setErrorMessage(response?.message);
      }
    }
  };

  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={8}>
          <Card variant="defaultWithBorder">
            <Box between={3}>
              {!has2FA && variant != "inHouse" ? (
                !userExists ? (
                  <>
                    <Heading level="h3">{content?.heading}</Heading>
                    <Text size="medium">{content?.subtext}</Text>
                  </>
                ) : (
                  <>
                    <Heading level="h3">{content?.onSuccessHeading}</Heading>
                  </>
                )
              ) : null}
              {!userNotExistAndContinueToRegister && (
                <>
                  {variant != "inHouse" && !has2FA ? (
                    <>
                      <Paragraph>{content?.paragraph}</Paragraph>
                      <Box inline between={4}>
                        {contentPolicies?.map((policy, index) => (
                          <Paragraph size="small" key={index}>
                            <Link href={policy?.linkTo}>{policy?.text}</Link>
                          </Paragraph>
                        ))}
                      </Box>
                      <HairlineDivider />
                    </>
                  ) : null}
                  {errorMessage?.message ? renderGeneralError() : null}
                  {!has2FA ? (
                    <>
                      <Input
                        type={"text"}
                        hintPosition={"below"}
                        label={
                          variant == "inHouse"
                            ? content?.employeeId
                            : content?.username
                        }
                        name="username"
                        autocomplete={true}
                        onChange={onDataFilling}
                        onBlur={validate}
                        value={username}
                        feedback={status}
                        error={error}
                        disabled={userExists}
                      />
                      {userExists && (
                        <Input
                          type={"password"}
                          hintPosition={"below"}
                          label={content?.password}
                          name="password"
                          autocomplete={false}
                          onChange={onDataFilling}
                          onBlur={validate}
                          value={password}
                          feedback={statusPwd}
                          error={errorPwd}
                        />
                      )}
                    </>
                  ) : (
                    <Input
                      type={"number"}
                      hintPosition={"below"}
                      label={content?.secureCode}
                      name="secureCode"
                      autocomplete={true}
                      onChange={onDataFilling}
                      onBlur={validate}
                      value={secureCode}
                      feedback={statusSecureCode}
                      error={errorSecureCode}
                    />
                  )}
                </>
              )}
              {userNotExistAndContinueToRegister && (
                <>
                  <Input
                    type={"email"}
                    hintPosition={"below"}
                    label={content?.email}
                    name="email"
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={email}
                    feedback={statusEmail}
                    error={errorEmail}
                  />
                  {!userExists &&
                  usernameIsCkecked &&
                  password?.length &&
                  !isValid ? (
                    <Requirements
                      value={password}
                      requirements={passwordRequirements}
                      onValidChange={(isValid) => setValid(isValid)}
                    />
                  ) : null}
                  <Input
                    type={"password"}
                    hintPosition={"below"}
                    label={content?.password}
                    name="password"
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={password}
                    feedback={statusPwd}
                    error={errorPwd}
                  />
                  <Input
                    type={"password"}
                    hintPosition={"below"}
                    label={content?.confirmPassword}
                    name="confirmPassword"
                    onChange={onDataFilling}
                    onBlur={validate}
                    value={confirmPassword}
                    feedback={statusConfirmPwd}
                    error={errorConfirmPwd}
                    autocomplete="off"
                  />
                </>
              )}
              {!userExists &&
              usernameIsCkecked &&
              !userNotExistAndContinueToRegister ? (
                <Button onClick={continueCTA} variant="primary">
                  {content?.continueCTA}
                </Button>
              ) : !userExists &&
                usernameIsCkecked &&
                userNotExistAndContinueToRegister ? (
                <Button onClick={signUpCTA} variant="primary">
                  {content?.signUpCTA}
                </Button>
              ) : !userNotExistAndContinueToRegister &&
                userExists &&
                usernameIsCkecked & !has2FA ? (
                <Spinner
                  label="Loading user"
                  size="small"
                  spinning={has2FALoading}
                  inline
                >
                  <Button onClick={signInCTA} variant="primary">
                    {content?.signInCTA}
                  </Button>
                </Spinner>
              ) : !userNotExistAndContinueToRegister &&
                userExists &&
                usernameIsCkecked & has2FA ? (
                <Spinner
                  label="Loading user"
                  size="small"
                  spinning={has2FALoading}
                  inline
                >
                  <Button onClick={submitSecureCodeCTA} variant="primary">
                    {content?.submitSecureCodeCTATxt}
                  </Button>
                </Spinner>
              ) : null}
              <Box between={1} vertical={3}>
                {variant != "inHouse" ? (
                  <>
                    {userExists && (
                      <ChevronLink href="#">
                        {content?.pwdForgotTxt}
                      </ChevronLink>
                    )}
                    {!userExists && (
                      <ChevronLink href="#">
                        {content?.usernameForgotTxt}
                      </ChevronLink>
                    )}
                  </>
                ) : null}
                <ChevronLink href="#">{content?.createTicket}</ChevronLink>
              </Box>
            </Box>
          </Card>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

Login.propTypes = {
  variant: PropTypes.oneOf(["regular", "inHouse", "Company"]).isRequired,
  checkUsernameOrEmailExists: PropTypes.func,
  sentLoginData: PropTypes.func,
  send2FALoginData: PropTypes.func,

  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      heading: PropTypes.string,
      onSuccessHeading: PropTypes.string,
      subtext: PropTypes.string,
      paragraph: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      email: PropTypes.string,
      confirmPassword: PropTypes.string,
      continueCTA: PropTypes.string,
      signUpCTA: PropTypes.string,
      signInCTA: PropTypes.string,
      securityCodeCTA: PropTypes.string,
      createTicket: PropTypes.string,
    }),
  ]).isRequired,
  policies: PropTypes.shape({
    en: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        linkTo: PropTypes.string,
      })
    ),
    fr: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        linkTo: PropTypes.string,
      })
    ),
  }),
};

Login.defaultProps = {
  variant: "inHouse",
  copy: "en",
  checkUsernameOrEmailExists: (user) => {
    const username = ["draqlablood", "admin"];
    if (username?.includes(user)) {
      return true;
    }
    return false;
  },
  sentLoginData: (userData) => {
    const { username, password } = userData;
    const name = ["draqlablood", "admin"];
    const pwd = "password";

    if (
      name.includes(username) &&
      username == "draqlablood" &&
      password == pwd
    ) {
      return {
        res: true,
        message: {
          status: 200,
          message: "We have sent you a code to your email address! ",
        },
      };
    } else if (
      name.includes(username) &&
      username == "draqlablood" &&
      password != pwd
    ) {
      return { res: false, message: { status: 401, message: "Login failed " } };
    } else {
      return {
        res: false,
        message: { status: 200, message: "For more security subscribe to 2FA" },
      };
    }
  },
  send2FALoginData: (userData) => {
    const { username, secureCode } = userData;
    const name = ["draqlablood", "admin"];
    const secure = 123456;

    if (
      name.includes(username) &&
      username == "draqlablood" &&
      secureCode == secure
    ) {
      return {
        res: true,
        message: { status: 200, message: "Loading user params ..." },
      };
    } else if (
      name.includes(username) &&
      username == "draqlablood" &&
      secureCode != secure
    ) {
      return {
        res: false,
        message: { status: 401, message: "Code incorrect" },
      };
    } else {
      return {
        res: false,
        message: { status: 200, message: "For more security subscribe to 2FA" },
      };
    }
  },
  policies: {
    en: [
      {
        text: "Terms",
        linkTo: "#",
      },
      {
        text: "Cookie",
        linkTo: "#",
      },
      {
        text: "Privacy",
        linkTo: "#",
      },
    ],
    fr: [
      {
        text: "Conditions",
        linkTo: "#",
      },
      {
        text: " Cookies",
        linkTo: "#",
      },
      {
        text: "Confidentialité",
        linkTo: "#",
      },
    ],
  },
};
export default Login;
