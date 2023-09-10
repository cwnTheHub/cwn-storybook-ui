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
import { getCopy, safeRest } from "../../util-helpers";
import copyDictionary from "./LoginText";
import Spinner from "../core-spinner/Spinner";
import Notification from "../core-notification/Notification";

const Login = ({
  variantType,
  cardVariant,
  checkUsernameOrEmailExists,
  sendLoginData,
  send2FALoginData,
  sendSignUPData,
  copy,
  policies,
  fullHeight,
  spacing,
  ...rest
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

  const [isLoginComplete, setIsLoginComplete] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

          if (response?.success || response?.error) {
            setUsernameIsChecked(true);
          }
          if (response?.success) {
            setUserExists(true);
            setStatus("success");
          }
          if (variantType != "regular" && response?.error) {
            setSuccessMessage(null);
            setErrorMessage({
              ...response?.error,
              message: content?.companyOREmployeeIDNotFoundTxt,
            });
          } else {
            setErrorMessage(null);
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
          setStatusConfirmPwd("success");
        }
        break;
      default:
    }
  };

  const continueCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setNextStep(true);
  };

  const signUpCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (
      statusConfirmPwd == "success" &&
      isValid &&
      !errorEmail &&
      !userExists
    ) {
      const response = sendSignUPData({ username, email, password });
      if (response?.success) {
        setIsLoginComplete(true);
        console.log("We are here", response);
        setSuccessMessage(response?.success);
      }
      if (response?.error) {
        setErrorMessage(response?.error);
      }
    }
  };

  const signInCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (password.length < 1) {
      setErrorPwd(content?.emptyField);
      setStatusPwd("error");
    } else if (username.length && password.length) {
      setHas2FALoading(true);
      const response = sendLoginData({ username, password });
      if (response?.success) {
        setHas2FALoading(false);

        setSuccessMessage(response?.success);

        setStatus(undefined);
        if (response?.data?.has2FA) {
          setHas2FA(true);
        } else {
          setIsLoginComplete(true);
        }
      }
      if (response?.error) {
        setHas2FALoading(false);
        setErrorMessage(response?.error);
        setStatusPwd("error");
        setPassword("");
        setStatus(undefined);
      }
    }
  };

  const renderGeneralError = () => {
    if (successMessage?.status >= 200 && successMessage?.status <= 299) {
      return (
        <Notification
          variant="success"
          copy={copy}
          data-testid="notification-success"
        >
          <Text small> {successMessage?.message}</Text>
        </Notification>
      );
    } else if (errorMessage?.status >= 400 && errorMessage?.status <= 499) {
      return (
        <Notification
          variant="error"
          copy={copy}
          data-testid="notification-error"
        >
          <Text small> {errorMessage?.message}</Text>
        </Notification>
      );
    } else {
      return (
        <Notification
          variant="warning"
          copy={copy}
          data-testid="notification-warning"
        >
          <Text small> {content?.error500}</Text>
        </Notification>
      );
    }
  };

  const submitSecureCodeCTA = (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (secureCode.length < 6 && secureCode > 6) {
      setErrorSecureCode("Code invalid");
      setStatusSecureCode("error");
    } else {
      const response = send2FALoginData({
        username,
        password,
        secureCode,
      });
      if (response?.success) {
        setErrorSecureCode(undefined);
        setStatusSecureCode("success");
        setSuccessMessage(response?.success);
        setIsLoginComplete(true);
      } else if (response?.error) {
        setErrorSecureCode(undefined);
        setStatusSecureCode("error");
        setErrorMessage(response?.error);
      }
    }
  };

  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={8}>
          <Card
            variant={cardVariant}
            {...safeRest(rest)}
            fullHeight={fullHeight}
          >
            <Box between={3}>
              {(errorMessage || successMessage) &&
              isLoginComplete &&
              userNotExistAndContinueToRegister
                ? renderGeneralError()
                : null}
              {!has2FA &&
              variantType == "regular" &&
              !userNotExistAndContinueToRegister ? (
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
                  {variantType == "regular" && !has2FA ? (
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
                  {errorMessage || successMessage ? renderGeneralError() : null}
                  {!isLoginComplete ? (
                    !has2FA ? (
                      <>
                        <Input
                          type={"text"}
                          hintPosition={"below"}
                          label={
                            variantType != "regular"
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
                          data-testid="username"
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
                            data-testid="pwd"
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
                        data-testid="secure-code-input"
                      />
                    )
                  ) : null}
                </>
              )}
              {!isLoginComplete &&
              !userExists &&
              userNotExistAndContinueToRegister &&
              variantType == "regular" ? (
                <>
                  {errorMessage || successMessage ? renderGeneralError() : null}
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
                    data-testid="email-input"
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
                    data-testid="password-input"
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
                    autocomplete="off"
                    data-testid="confirm-pwd-input"
                  />
                </>
              ) : null}
              {!isLoginComplete ? (
                <>
                  {!userExists &&
                  usernameIsCkecked &&
                  !userNotExistAndContinueToRegister &&
                  variantType == "regular" ? (
                    <Button
                      onClick={continueCTA}
                      variant="primary"
                      data-testid="create-account-button"
                    >
                      {content?.continueCTA}
                    </Button>
                  ) : !userExists &&
                    usernameIsCkecked &&
                    userNotExistAndContinueToRegister ? (
                    <Button
                      onClick={signUpCTA}
                      variant="primary"
                      data-testid="sign-up-button"
                    >
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
                      <Button
                        onClick={signInCTA}
                        variant="primary"
                        data-testid="sign-in-button"
                      >
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
                      <Button
                        onClick={submitSecureCodeCTA}
                        variant="primary"
                        data-testid="sign-in-with-code-button"
                      >
                        {content?.submitSecureCodeCTATxt}
                      </Button>
                    </Spinner>
                  ) : null}
                </>
              ) : null}
              <Box between={1} vertical={3}>
                {!isLoginComplete
                  ? variantType != "inHouse" && (
                      <>
                        {userExists && !has2FA && (
                          <div data-testid="link-pwd-forgot">
                            <ChevronLink href="#">
                              {content?.pwdForgotTxt}
                            </ChevronLink>
                          </div>
                        )}
                        {!userExists &&
                          !usernameIsCkecked &&
                          !userNotExistAndContinueToRegister && (
                            <div data-testid="link-username-forgot">
                              <ChevronLink href="#">
                                {content?.usernameForgotTxt}
                              </ChevronLink>
                            </div>
                          )}
                      </>
                    )
                  : null}
                <div>
                  <ChevronLink href="#">{content?.createTicket}</ChevronLink>
                </div>
              </Box>
            </Box>
          </Card>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

Login.propTypes = {
  variantType: PropTypes.oneOf(["regular", "inHouse", "Company"]).isRequired,
  cardVariant: PropTypes.oneOf([
    "white",
    "lavender",
    "grey",
    "default",
    "branded",
    "alternative",
    "defaultWithBorder",
    "defaultOnlyBorder",
  ]),
  checkUsernameOrEmailExists: PropTypes.func,
  sendLoginData: PropTypes.func,
  send2FALoginData: PropTypes.func,
  sendSignUPData: PropTypes.func,

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
  fullHeight: PropTypes.bool,
  spacing: PropTypes.oneOf(["default", "narrow", "compact", "intermediate"]),
};

Login.defaultProps = {
  variantType: "regular",
  cardVariant: "defaultWithBorder",
  copy: "en",
  fullHeight: false,
  checkUsernameOrEmailExists: (user) => {
    const username = ["moderator", "admin"];
    if (username?.includes(user)) {
      return {
        error: null,
        data: true,
        success: {
          status: 200,
          message: "We have sent you a code to your email address! ",
        },
      };
    }
    return {
      success: null,
      data: false,
      error: {
        status: 404,
        message: "User does not exist! Create an account. ",
      },
    };
  },
  sendLoginData: (userData) => {
    const { username, password } = userData;
    const name = ["moderator", "admin"];
    const pwd = "password";

    if (name.includes(username) && username == "moderator" && password == pwd) {
      return {
        error: null,
        data: { has2FA: true },
        success: {
          status: 200,
          message: "We have sent you a security code to your email address.",
        },
      };
    } else if (
      name.includes(username) &&
      username == "admin" &&
      password == pwd
    ) {
      return {
        error: null,
        data: { has2FA: false },
        success: {
          status: 200,
          message: "For more security activate the 2FA ",
        },
      };
    } else if (
      name.includes(username) &&
      (username == "moderator" || username == "admin") &&
      password != pwd
    ) {
      return { data: false, error: { status: 401, message: "Login failed!" } };
    }
    return null;
  },
  send2FALoginData: (userData) => {
    const { username, secureCode } = userData;
    const name = ["moderator", "admin"];
    const secure = 123456;

    console.log("test .. ", { username, secureCode });

    if (
      name.includes(username) &&
      username == "moderator" &&
      secureCode == secure
    ) {
      return {
        error: null,
        data: true,
        success: { status: 200, message: "Loading user params . . ." },
      };
    } else if (
      name.includes(username) &&
      username == "moderator" &&
      secureCode != secure
    ) {
      return {
        success: null,
        data: false,
        error: { status: 401, message: "Code incorrect" },
      };
    }
  },
  sendSignUPData: (userData) => {
    const { username, email, password } = userData;
    const emails = [];
    if (emails.includes(email)) {
      return {
        success: null,
        data: null,
        error: {
          status: 401,
          message: "Email already exists !",
        },
      };
    }
    return {
      error: null,
      data: { username, email, password },
      success: {
        status: 200,
        message:
          "Thanks for registering! Please check your email for an activation link",
      },
    };
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
